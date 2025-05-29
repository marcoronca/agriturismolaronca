"use server"

import { AIRTABLE, API_TAG } from "@/model/airtable"
import { airtableCache } from "./airtable"
import { AppContents, ContentsFields } from "@/model/contents"
import { AppLocale } from "@/model/locale"
import { AppPages } from "@/model/app"
import { DEFAULT_LOCALE } from "../utils/locales"

export const getPageContents = async (locale: AppLocale, page: AppPages | undefined) => {
    const lang = locale || DEFAULT_LOCALE

    const pageFilter = page ? `PAGE = '${page}',` : ``
    const pageTag = page ? `${page}` : `global`
    const contents = await airtableCache({
        table: AIRTABLE.Contents,
        tag: `${lang}_${pageTag}_${API_TAG.contents}`,
        revalidate: process.env.REVALIDATE_PERIOD_CONTENT_MEDIA ? parseInt(process.env.REVALIDATE_PERIOD_CONTENT_MEDIA) : undefined,
        queryParams: {
            fields: [
                ContentsFields.ContentKey,
                ContentsFields.IT,
                ContentsFields.EN,
            ],
            view: AIRTABLE.Contents,
            filterByFormula: `
                AND(
                    NOT(TRIM({${ContentsFields.ContentKey}}) = ''),
                    OR(
                        NOT(TRIM({${ContentsFields.IT}}) = ''),
                        NOT(TRIM({${ContentsFields.EN}}) = '')
                    ),
                    OR(
                        ${pageFilter}
                        PAGE = 'All'
                    )
                )`,
        }
    })
    //console.log(`Page Contents for page: ${page} (locale:${locale}, lang:${lang})`)
    console.log(`Content: ${contents.length}`)
    return contents.reduce<AppContents>((accumulator, current) => {
        const key = current.fields[ContentsFields.ContentKey] as string
        const content = lang === 'it' ? current.fields[ContentsFields.IT] : current.fields[ContentsFields.EN]
        accumulator[key] = content as string
        return accumulator
    }, {})
}