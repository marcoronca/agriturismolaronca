"use server"

import { AIRTABLE, API_TAG } from "@/model/airtable"
import { airtableCache } from "./airtable"
import { AppLocale } from "@/model/locale"
import { AppPages } from "@/model/app"
import { AppMedias, MediaFields } from "@/model/media"
import { Attachment } from "airtable"
import { DEFAULT_LOCALE } from "../utils/locales"

export const getPageMedias = async (locale: AppLocale, page: AppPages) => {
    const lang = locale || DEFAULT_LOCALE
    const localeField = MediaFields[`Media${lang.toUpperCase()}` as keyof typeof MediaFields]
    if (!localeField) {
        return {} as AppMedias
    }
    const contents = await airtableCache({
        table: AIRTABLE.Media,
        tag: API_TAG.media,
        revalidate: 60 * 30,
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
        if (!media) {
            return accumulator
        }
        accumulator[key] = {
            url: media.url,
            type: media.type,
        }
        return accumulator
    }, {})
}