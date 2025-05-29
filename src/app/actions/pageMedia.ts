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
    const pageTag = page ? `${page}` : `global`
    const contents = await airtableCache({
        table: AIRTABLE.Media,
        tag: `${lang}_${pageTag}_${API_TAG.media}`,
        revalidate: process.env.REVALIDATE_PERIOD_CONTENT_MEDIA ? parseInt(process.env.REVALIDATE_PERIOD_CONTENT_MEDIA) : undefined,
        queryParams: {
            fields: [
                MediaFields.Key,
                MediaFields.MediaIT,
                MediaFields.MediaEN,
            ],
            filterByFormula: `PAGE = '${page}'`,
        }
    })
    //console.log(`Page Medias for page: ${page} (locale:${locale}, lang:${lang})`)
    console.log(`Medias: ${contents.length}`)
    return contents.reduce<AppMedias>((accumulator, current) => {
        const key = current.fields[MediaFields.Key] as string
        const mediaIT = (current.fields[MediaFields.MediaIT] as Attachment[])
        const mediaEN = (current.fields[MediaFields.MediaEN] as Attachment[])
        const media = lang === 'it' ? mediaIT : mediaEN
        if (!media) {
            return accumulator
        }
        accumulator[key] = media.map((media) => ({
            url: media.url,
            type: media.type,
        }))
        return accumulator
    }, {})
}