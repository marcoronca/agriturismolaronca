"use server"

import { AIRTABLE, API_TAG } from "@/model/airtable"
import { airtableCache } from "./airtable"
import { AppContents, ContentsFields } from "@/model/contents"
import { AppLocale } from "@/model/locale"
import { AppPages } from "@/model/app"

export const getPageContents = async (lang: AppLocale, page: AppPages | undefined) => {
    const localeField = ContentsFields[lang.toUpperCase() as keyof typeof ContentsFields]
    const pageFilter = page ? `PAGE = '${page}',` : ``
    const contents = await airtableCache({
        table: AIRTABLE.Contents,
        tag: API_TAG.contents,
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