import { AppLocale } from "./locale"

export type Props<T = object> = {
    params: Promise<{ lang: AppLocale } & T>
    searchParams: never
}

export enum AppPages {
    Home = 'Home',
    Gallery = 'Gallery',
    Pricing = 'Pricing',
    Services = 'Services',
    Contact = 'Contact',
}

interface AppPageRoute {
    url: string
    sitemapPriority: number
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

type AppPagesRoutesType = Record<keyof typeof AppPages, AppPageRoute>;

export const AppPagesRoutes: AppPagesRoutesType = {
    [AppPages.Home]: {
        url: '/',
        sitemapPriority: 1,
        changeFrequency: 'monthly'
    },
    [AppPages.Gallery]: {
        url: '/gallery',
        sitemapPriority: 0.9,
        changeFrequency: 'monthly'
    },
    [AppPages.Pricing]: {
        url: '/pricing',
        sitemapPriority: 0.8,
        changeFrequency: 'daily'
    },
    [AppPages.Services]: {
        url: '/services',
        sitemapPriority: 0.9,
        changeFrequency: 'weekly'
    },
    [AppPages.Contact]: {
        url: '/contact',
        sitemapPriority: 0.7,
        changeFrequency: 'yearly'
    },
} as const