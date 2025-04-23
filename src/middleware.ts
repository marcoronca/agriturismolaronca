import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { AppLocale } from "./model/locale";
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "./app/utils/locales";


const getLocale = (request: NextRequest): AppLocale => {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: AppLocale[] = [...AVAILABLE_LOCALES];

    // Use negotiator and intl-localematcher to get best locale
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = matchLocale(languages, locales, DEFAULT_LOCALE) as AppLocale;

    return locale;
}


export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    // Check if the pathname already has a locale
    const pathnameHasLocale = AVAILABLE_LOCALES.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    //console.log("✅ Pathname has locale:", pathnameHasLocale);

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    //console.log("❌ Redirecting to:", request.nextUrl.pathname);

    // Redirect to the localized URL
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico, sitemap.xml, robots.txt (metadata files)
        * - .png, .webp, .svg, .jpg (image files)
        */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|favicon|images|.*\\.(?:png|webp|svg|jpg|ico)).*)',
    ],

};