export enum MediaFields {
    Key = 'Key',
    MediaIT = 'MediaIT',
    MediaEN = 'MediaEN'
}

export interface AppMedias {
    [key: string]: {
        url: string;
        type: string;
    };
}