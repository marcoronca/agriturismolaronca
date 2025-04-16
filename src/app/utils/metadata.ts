import { Metadata, ResolvingMetadata } from "next"
import { getPageContents } from "../actions/pageContents"
import { AppPages, Props } from "@/model/app"
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "./locales"


export const generateDefaultMetadata = (page: AppPages) => async (
    props: Props,
    parent: ResolvingMetadata
): Promise<Metadata> => {
    const { params } = props
    const { lang } = await params

    const locale = AVAILABLE_LOCALES.includes(lang) ? lang : DEFAULT_LOCALE

    const pageContents = await getPageContents(locale, page)
    const parentData = await parent

    const title = pageContents.page_title
    return {
        metadataBase: new URL(process.env.FE_BASE_URL),
        title,
        description: pageContents.page_description || parentData.description || '',
        applicationName: title,
        keywords: pageContents.page_keywords || parentData.keywords || '',
        alternates: {
            canonical: `${process.env.FE_BASE_URL}/${lang}`,
            languages: {
                en: `/en/`,
                it: `/it/`
            }
        },
        authors: {
            name: 'Marco Baratto',
            url: 'https://marcobaratto.dev/'
        },
        creator: 'Marco Baratto',
        twitter: {
            card: 'summary_large_image',
            title,
            description: pageContents.page_description || parentData.description || '',
            creator: '@marchintosh94',
        },
        openGraph: {
            title: title,
            siteName: title,
            locale: lang,
            description: pageContents.page_description || parentData.description || '',
            type: 'website',
            url: new URL(process.env.FE_BASE_URL),
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                "max-snippet": -1,
                "max-video-preview": -1,
                "max-image-preview": 'large',
            },
        },
        icons: [
            {
                rel: 'icon',
                type: 'image/png',
                url: '/favicon/icon-512x512.png',
                sizes: '512x512'
            },
            {
                rel: 'icon',
                type: 'image/png',
                url: '/favicon/icon-192x192.png',
                sizes: '192x192'
            },
            {
                rel: 'icon',
                type: 'image/png',
                url: '/favicon/icon-32x32.png',
                sizes: '32x32'
            },
            {
                rel: 'icon',
                type: 'image/png',
                url: '/favicon/icon-16x16.png',
                sizes: '16x16'
            },
        ],
        appleWebApp: {
            title: title,
            statusBarStyle: 'black-translucent',
            capable: true
        }
    }
}