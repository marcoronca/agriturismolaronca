import { Price } from "@/model/prices";

export const showRoomPrice = (roomPrice?: Price): string => {
    const price = roomPrice?.price ?? -1;
    return price !== -1 ? `€ ${price}` : "Price not available";
}
export const showStatusForCurrentDate = (roomPrices: Price[]): string | undefined => {
    const today = new Date();
    const price = getRoomPriceForDate(roomPrices, today);
    return price?.status || ''
}

export const getRoomPriceForDate = (roomPrices: Price[], date: Date): Price | undefined => {
    const targetDate = date.getTime();
    const priceEntry = roomPrices.find(price => {
        const from = new Date(price.from.date).getTime();
        const to = new Date(price.to.date).getTime();
        return targetDate >= from && targetDate <= to;
    });
    return priceEntry
}