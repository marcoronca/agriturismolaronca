"use server"

import Airtable, { FieldSet } from 'airtable'
import { unstable_cache } from 'next/cache'
import { QueryParams } from 'airtable/lib/query_params'

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_WORKSPACE!)

interface AirtableCacheOptions {
  table: string
  tag: string
  queryParams?: QueryParams<FieldSet>
}

export const airtableCache = ({
  table,
  tag,
  queryParams
}: AirtableCacheOptions) =>
  unstable_cache(async () => airtable(table).select(queryParams).all(), [tag], {
    tags: [tag],
    revalidate: process.env.NODE_ENV === 'development' ? 1 : false
  })
