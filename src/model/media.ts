export enum MediaFields {
    Key = 'Key',
    MediaIT = 'MediaIT',
    MediaEN = 'MediaEN',
    Page = 'Page'
}

export type Media = {
    url: string;
    type: string;
    filename: string;
};
export interface AppMedias {
    [key: string]: Media[];
}

export interface ImagesSectionData {
    url: string;
    fallbackUrl: string
}