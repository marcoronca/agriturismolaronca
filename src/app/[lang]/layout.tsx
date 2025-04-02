import { Lora, Poppins } from "next/font/google";
import "../globals.css";
import { generateDefaultMetadata } from "../utils/metadata";
import { AppPages } from "@/model/app";
import { AppLocale } from "@/model/locale";
import Link from "next/link";
import Image from "next/image";
import { getPageContents } from "../actions/pageContents";
import NavbarLinkList from "../components/navbar/NavbarLinkList";
import { MobileNav } from "../components/navbar/MobileNavbar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const generateMetadata = generateDefaultMetadata(AppPages.Home);

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: AppLocale }>;
}>) {
  const { lang } = await params;
  const globalContents = await getPageContents(lang, undefined);

  return (
    <html
      lang={lang}
      className={`${lora.variable} ${poppins.variable} antialiased`}
    >
      <body className={`antialiased  min-h-screen`}>
        <Header globalContents={globalContents} />
        <main>{children}</main>
        <Footer globalContents={globalContents} />
      </body>
    </html>
  );
}
