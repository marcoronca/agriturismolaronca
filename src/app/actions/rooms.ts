"use server"

import { AIRTABLE, API_TAG } from "@/model/airtable"
import { airtableCache } from "./airtable"
import { Room, RoomFields } from "@/model/rooms"
import { getPrices } from "./prices"
import { Attachment } from "airtable"
import { AppLocale } from "@/model/locale"
import { DEFAULT_LOCALE } from "../utils/locales"

export const getRooms = async (locale: AppLocale): Promise<Room[]> => {
    const lang = locale || DEFAULT_LOCALE
    const roomsRequestOptions = {
        table: AIRTABLE.Rooms,
        tag: API_TAG.rooms,
        revalidate: 60 * 30,
        queryParams: {
            fields: [
                RoomFields.NameIT,
                RoomFields.NameEN,
                RoomFields.Images,
                RoomFields.Prices,
                RoomFields.RoomFeaturesIT,
                RoomFields.RoomFeaturesEN
            ]
        }
    }
    const [rooms, prices] = await Promise.all([
        airtableCache(roomsRequestOptions),
        getPrices(lang)
    ])
    return rooms.map<Room>(room => {
        const roomName = lang === 'it' ? room.fields[RoomFields.NameIT] : room.fields[RoomFields.NameEN]
        const features = lang === 'it' ? room.fields[RoomFields.RoomFeaturesIT] : room.fields[RoomFields.RoomFeaturesEN]
        return {
            id: room.id,
            name: roomName as string,
            images: (room.fields[RoomFields.Images] as Attachment[]) || [],
            prices: prices.filter(price => price.room === room.id),
            features: features ? features as string[] : [],
        }
    })
}