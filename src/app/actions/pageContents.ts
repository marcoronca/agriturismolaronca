"use server"

import { AIRTABLE, API_TAG } from "@/model/airtable"
import { airtableCache } from "./airtable"
import { ContentsFields } from "@/model/contents"

export const getPageContents = () => airtableCache({
    table: AIRTABLE.Contents,
    tag: API_TAG.contents,
    queryParams: {
        fields: [
            ContentsFields.ContentKey,
            ContentsFields.EN,
            ContentsFields.IT
        ],
        view: AIRTABLE.Contents
    }
})