import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarLinkList from "../navbar/NavbarLinkList";
import { MobileNav } from "../navbar/MobileNavbar";
import { AppContents } from "@/model/contents";
import SwitchLanguage from "../ui/SwitchLanguage";
import { AppLocale } from "@/model/locale";

interface HeaderProps {
  globalContents: AppContents;
  lang: AppLocale;
}

export default function Header({ globalContents, lang }: HeaderProps) {
  return (
    <header className="bg-white shadow-2xs sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link
            href={`/${lang}/`}
            className="text-2xl font-bold text-stone-700 flex items-center"
          >
            <Image
              className="object-contain w-32 h-10 sm:w-40 sm:h-14"
              alt={globalContents.main_logo_alt}
              src={"/images/logoRonca.png"}
              width={160}
              height={56}
            />
            <h1 className="text-base sm:text-2xl">
              {globalContents.page_title}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            <NavbarLinkList globalContents={globalContents} lang={lang} />
            <li>
              <SwitchLanguage />
            </li>
          </ul>

          {/* Mobile Navigation */}
          <MobileNav content={globalContents} lang={lang} />
        </nav>
      </div>
    </header>
  );
}
