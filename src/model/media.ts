export enum MediaFields {
    Key = 'Key',
    MediaIT = 'MediaIT',
    MediaEN = 'MediaEN'
}

export type Media = {
    url: string;
    type: string;
};
export interface AppMedias {
    [key: string]: Media[];
}