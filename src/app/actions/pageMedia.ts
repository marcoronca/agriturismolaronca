"use server"

import { AIRTABLE, API_TAG } from "@/model/airtable"
import { airtableCache } from "./airtable"
import { AppLocale } from "@/model/locale"
import { AppPages } from "@/model/app"
import { AppMedias, MediaFields } from "@/model/media"
import { Attachment } from "airtable"

export const getPageMedias = async (lang: AppLocale, page: AppPages) => {
    const localeField = MediaFields[`Media${lang.toUpperCase()}` as keyof typeof MediaFields]

    const contents = await airtableCache({
        table: AIRTABLE.Media,
        tag: API_TAG.media,
        queryParams: {
            fields: [
                MediaFields.Key,
                localeField
            ],
            filterByFormula: `PAGE = '${page}'`,
        }
    })
    return contents.reduce<AppMedias>((accumulator, current) => {
        const key = current.fields[MediaFields.Key] as string
        const media = (current.fields[localeField] as Attachment[])?.[0]
        accumulator[key] = {
            url: media.url,
            type: media.type,
        }
        return accumulator
    }, {})
}