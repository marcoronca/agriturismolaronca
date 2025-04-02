import { AppContents } from "@/model/contents";
import Link from "next/link";
import React from "react";

interface NavbarLinkListProps {
  globalContents: AppContents;
  onClick?: () => void;
}

const NavbarLinkList = ({ globalContents, onClick }: NavbarLinkListProps) => {
  return (
    <>
      <li>
        <Link href="/services" onClick={onClick}>
          {globalContents.link_services}
        </Link>
      </li>
      <li>
        <Link href="/gallery" onClick={onClick}>
          {globalContents.link_gallery}
        </Link>
      </li>
      <li>
        <Link href="/prices" onClick={onClick}>
          {globalContents.link_prices}
        </Link>
      </li>
      <li>
        <Link href="/contacts" onClick={onClick}>
          {globalContents.link_contacts}
        </Link>
      </li>
    </>
  );
};

export default NavbarLinkList;
