import { MetadataRoute } from "next";
import { AVAILABLE_LOCALES } from "./utils/locales";
import { AppPagesRoutes } from "@/model/app";

const sitemap = (): MetadataRoute.Sitemap => Object.values(AppPagesRoutes).map(page => ({
    url: `${process.env.FE_BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.sitemapPriority,
    alternates: {
        languages: Object.fromEntries(AVAILABLE_LOCALES.map(locale => {
            return [locale, `${process.env.FE_BASE_URL}/${locale}${page.url}`]
        })),
    },


}))

export default sitemap