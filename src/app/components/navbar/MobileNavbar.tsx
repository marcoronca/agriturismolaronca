"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/button/Button";
import { AppContents } from "@/model/contents";
import NavbarLinkList from "./NavbarLinkList";

interface MobileNavProps {
  content: AppContents;
}

export const MobileNav = ({ content }: MobileNavProps) => {
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
            <span className="text-2xl font-bold text-stone-700">Menu</span>
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
            <NavbarLinkList globalContents={content} onClick={toggleMenu} />
          </ul>
        </nav>
      </div>
    </>
  );
};
