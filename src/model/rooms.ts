import { Price } from "./prices";

export enum RoomFields {
    NameIT = 'NameIT',
    NameEN = 'NameEN',
    Images = 'Images',
    Prices = 'Prices',
    RoomFeaturesIT = 'RoomFeaturesIT',
    RoomFeaturesEN = 'RoomFeaturesEN',
}

export interface RoomResponse {
    NameIT: string;
    NameEN: string;
    Images: {
        url: string;
        type: string;
    }[];
    Prices: string[];
    RoomFeaturesIT: string;
    RoomFeaturesEN: string;
}

export interface Room {
    id: string;
    name: string;
    images: {
        url: string;
        type: string;
    }[];
    prices: Price[];
    features: string[];
}