export enum PriceFields {
    From = 'From',
    To = 'To',
    Status = 'Status',
    Price = 'Price',
    Room = 'Room'
}

export interface PriceResponse {
    From: string;
    To: string;
    Status: string;
    Price: number;
    Room: string;
}

export interface PriceDate {
    date: Date;
    dateUi: string;
    dayMonth: string;
    year: string;
}

export interface Price {
    id: string;
    from: PriceDate;
    to: PriceDate;
    status: string;
    price: number;
    room: string;
}