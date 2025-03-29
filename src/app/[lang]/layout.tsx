import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { generateDefaultMetadata } from "../utils/metadata";
import { AppPages } from "@/model/app";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const generateMetadata = generateDefaultMetadata(AppPages.Home);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${sourceSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
