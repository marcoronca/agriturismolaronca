"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/button/Button";
import { AppContents } from "@/model/contents";
import NavbarLinkList from "./NavbarLinkList";
import Image from "next/image";
import { AppLocale } from "@/model/locale";
import SwitchLanguage from "../ui/SwitchLanguage";
import Link from "next/link";

interface MobileNavProps {
  content: AppContents;
  lang: AppLocale;
}

export const MobileNav = ({ content, lang }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant="ghost"
        className="md:hidden p-2"
        onClick={toggleMenu}
        icon={<Menu className="h-6 w-6" />}
        aria-label={content.toggle_menu}
      >
        <span className="sr-only">{content.toggle_menu}</span>
      </Button>

      <div
        className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Image
              className="object-contain w-14 h-14"
              alt={content.main_logo_alt}
              src={"/images/logoRonca.png"}
              width={56}
              height={56}
            />
            <Button
              variant="ghost"
              className="p-2"
              aria-label={content.close_menu}
              icon={<X className="h-6 w-6" />}
              onClick={toggleMenu}
            >
              <span className="sr-only">{content.close_menu}</span>
            </Button>
          </div>
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <Link onClick={toggleMenu} href={`/${lang}/`}>
                Home
              </Link>
            </li>
            <NavbarLinkList
              globalContents={content}
              onClick={toggleMenu}
              lang={lang}
            />
            <li>
              <SwitchLanguage />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
