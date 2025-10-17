"use server"

import { AIRTABLE, API_TAG } from "@/model/airtable"
import { airtableCache } from "./airtable"
import { Price, PriceDate, PriceFields } from "@/model/prices"
import { AppLocale } from "@/model/locale"
import { DEFAULT_LOCALE } from "../utils/locales"
import { formatDate } from "../utils/date"

export const getPrices = async (locale: AppLocale) => {
    const lang = locale || DEFAULT_LOCALE
    const prices = await airtableCache({
        table: AIRTABLE.Prices,
        tag: API_TAG.prices,
        revalidate: process.env.REVALIDATE_PERIOD_ROOMS_PRICES ? parseInt(process.env.REVALIDATE_PERIOD_ROOMS_PRICES) : undefined,
        queryParams: {
            fields: [
                PriceFields.From,
                PriceFields.To,
                PriceFields.Status,
                PriceFields.Price,
                PriceFields.Room
            ],
            filterByFormula: `
                AND(
                    YEAR(From) >= ${new Date().getFullYear().toString()},
                    YEAR(To) >= ${new Date().getFullYear().toString()},
                    DATETIME_DIFF(To, TODAY(), "days") >= 0
                )    
            `,
            sort: [
                {
                    field: PriceFields.From,
                    direction: 'asc'
                }
            ]
        }
    })
    return prices.map<Price>(price => {
        const fromDate = new Date(price.fields[PriceFields.From] as string)
        const from: PriceDate = {
            date: fromDate,
            dateUi: formatDate(fromDate, lang),
            dayMonth: formatDate(fromDate, lang, { day: '2-digit', month: '2-digit' }),
            year: formatDate(fromDate, lang, { year: 'numeric' })
        }


        const toDate = new Date(price.fields[PriceFields.To] as string);
        const to: PriceDate = {
            date: toDate,
            dateUi: formatDate(toDate, lang),
            dayMonth: formatDate(toDate, lang, { day: '2-digit', month: '2-digit' }),
            year: formatDate(toDate, lang, { year: 'numeric' })
        }

        return {
            id: price.id,
            from,
            to,
            status: price.fields[PriceFields.Status] as string,
            room: (price.fields[PriceFields.Room] as string[])?.[0] || "",
            price: price.fields[PriceFields.Price] as number
        }
    })
}
