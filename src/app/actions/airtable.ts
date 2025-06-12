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
  revalidate?: number
}

export const airtableCache = async ({
  table,
  tag,
  queryParams,
  revalidate
}: AirtableCacheOptions) => {

  const isDevelopment = process.env.VERCEL_ENV === 'development'
  const revalidation = revalidate || false
  const revalidatePeriod = isDevelopment ? 1 : revalidation

  console.log({ revalidation, revalidatePeriod, isDevelopment })

  return unstable_cache(
    async () => {
      const timestamp = new Date().toISOString().replace(/[T]+/gm, ' ').replace(/[Z]+|(\.\d{3})/gm, '')
      console.log(`[REVALIDATE] [${timestamp}] - tag: ${tag}, table: ${table}, revalidate: ${revalidatePeriod} seconds`)
      return airtable(table).select(queryParams).all()
    },
    [tag],
    {
      tags: [tag],
      revalidate: revalidatePeriod
    }
  )
}
