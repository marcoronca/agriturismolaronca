import React from "react";
import NavbarLinkList from "../navbar/NavbarLinkList";
import { AppContents } from "@/model/contents";
import { AppLocale } from "@/model/locale";

interface FooterProps {
  globalContents: AppContents;
  lang: AppLocale;
}

export default function Footer({ globalContents, lang }: FooterProps) {
  return (
    <footer className="bg-stone-200 text-stone-700">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav aria-label="Footer" className="-mb-6 text-sm/6">
          <ul className="flex flex-wrap justify-center gap-x-12 gap-y-3">
            <NavbarLinkList globalContents={globalContents} lang={lang} />
          </ul>
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          <a
            href={globalContents.facebook_link}
            className="hover:text-blue-600"
          >
            <span className="sr-only">Facebook</span>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href={globalContents.tripadvisor_link}
            className="hover:text-emerald-600"
          >
            <span className="sr-only">Tripadvisor</span>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-6"
            >
              <path d="M23.011 9.532c.281-1.207 1.175-2.416 1.175-2.416h-4.012c-2.251-1.455-4.981-2.226-8.013-2.226-3.14 0-5.978.78-8.214 2.251H.186s.885 1.186 1.17 2.386C.624 10.534.189 11.749.189 13.084c0 3.316 2.697 6.008 6.012 6.008 1.891 0 3.571-.885 4.681-2.254l1.275 1.916 1.291-1.936c.57.736 1.32 1.336 2.205 1.74 1.455.66 3.092.736 4.592.18 3.106-1.154 4.696-4.621 3.556-7.726-.209-.556-.48-1.051-.81-1.485l.02.005zm-3.171 8.072c-1.2.445-2.505.395-3.67-.143-.824-.383-1.503-.982-1.988-1.727-.201-.299-.375-.623-.503-.971-.146-.395-.22-.803-.259-1.215-.074-.832.045-1.673.405-2.453.54-1.164 1.501-2.051 2.701-2.496 2.49-.914 5.25.361 6.166 2.841.916 2.481-.36 5.245-2.835 6.163h-.017zm-9.668-1.834c-.863 1.271-2.322 2.113-3.973 2.113-2.646 0-4.801-2.156-4.801-4.797 0-2.641 2.156-4.802 4.801-4.802s4.798 2.161 4.798 4.802c0 .164-.03.314-.048.479-.081.811-.341 1.576-.777 2.221v-.016zM3.15 13.023c0 1.641 1.336 2.971 2.971 2.971s2.968-1.33 2.968-2.971c0-1.635-1.333-2.964-2.966-2.964-1.636 0-2.971 1.329-2.971 2.964H3.15zm12.048 0c0 1.641 1.329 2.971 2.968 2.971 1.636 0 2.965-1.33 2.965-2.971 0-1.635-1.329-2.964-2.965-2.964-1.635 0-2.971 1.329-2.971 2.964h.003zm-11.022 0c0-1.071.869-1.943 1.936-1.943 1.064 0 1.949.873 1.949 1.943 0 1.076-.869 1.951-1.949 1.951-1.081 0-1.951-.875-1.951-1.951h.015zm12.033 0c0-1.071.869-1.943 1.949-1.943 1.066 0 1.937.873 1.937 1.943 0 1.076-.87 1.951-1.952 1.951-1.079 0-1.949-.875-1.949-1.951h.015zM12.156 5.94c2.161 0 4.111.389 5.822 1.162-.645.018-1.275.131-1.906.36-1.515.555-2.715 1.665-3.375 3.125-.315.66-.48 1.359-.541 2.065-.225-3.076-2.76-5.515-5.881-5.578C7.986 6.34 9.967 5.94 12.112 5.94h.044z" />
            </svg>
          </a>
          <a
            href={globalContents.planimetria_link}
            className="hover:text-red-600"
          >
            <span className="sr-only">Planimetria</span>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"/> </path>
            </svg>
          </a>
        </div>
        <p className="mt-10 text-center text-sm/6">
          &copy; {new Date().getFullYear()} {globalContents.site_name}.{" "}
          {globalContents.footer_copyright}.
        </p>
        <p className="mt-10 text-center text-sm/6">
          {globalContents.footer_CIN}
        </p>
      </div>
    </footer>
  );
}
