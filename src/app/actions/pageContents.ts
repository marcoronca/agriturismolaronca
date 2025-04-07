"use server"

import { AIRTABLE, API_TAG } from "@/model/airtable"
import { airtableCache } from "./airtable"
import { AppContents, ContentsFields } from "@/model/contents"
import { AppLocale } from "@/model/locale"
import { AppPages } from "@/model/app"
import { DEFAULT_LOCALE } from "../utils/locales"

export const getPageContents = async (locale: AppLocale, page: AppPages | undefined) => {
    const lang = locale || DEFAULT_LOCALE
    const localeField = ContentsFields[lang.toUpperCase() as keyof typeof ContentsFields]
    if (!localeField) {
        return {} as AppContents
    }
    const pageFilter = page ? `PAGE = '${page}',` : ``
    const contents = await airtableCache({
        table: AIRTABLE.Contents,
        tag: API_TAG.contents,
        revalidate: 60 * 30,
        queryParams: {
            fields: [
                ContentsFields.ContentKey,
                localeField
            ],
            view: AIRTABLE.Contents,
            filterByFormula: `
                AND(
                    NOT(TRIM({${ContentsFields.ContentKey}}) = ''), 
                    NOT(TRIM({${localeField}}) = ''),
                    OR(
                        ${pageFilter}
                        PAGE = 'All'
                    )
                )`,
        }
    })
    return contents.reduce<AppContents>((accumulator, current) => {
        const key = current.fields[ContentsFields.ContentKey] as string
        accumulator[key] = current.fields[localeField] as string
        return accumulator
    }, {})
}