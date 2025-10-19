import { AppContents } from "@/model/contents";
import { AppLocale } from "@/model/locale";
import Link from "next/link";
import React from "react";

interface NavbarLinkListProps {
  globalContents: AppContents;
  onClick?: () => void;
  lang: AppLocale;
}

const NavbarLinkList = ({
  globalContents,
  onClick,
  lang,
}: NavbarLinkListProps) => {
  return (
    <>
      <li>
        <Link href={`/${lang}/services`} onClick={onClick}>
          {globalContents.link_services}
        </Link>
      </li>
      <li>
        <Link href={`/${lang}/gallery`} onClick={onClick}>
          {globalContents.link_gallery}
        </Link>
      </li>
      <li>
        <Link href={`/${lang}/prices`} onClick={onClick}>
          {globalContents.link_prices}
        </Link>
      </li>
      <li>
        <Link href={`/${lang}/contacts`} onClick={onClick}>
          {globalContents.link_contacts}
        </Link>
      </li>
      <li>
        <Link href={`/${lang}/planimetry`} onClick={onClick}>
          {globalContents.link_planimetria}
        </Link>
      </li>
    </>
  );
};

export default NavbarLinkList;
