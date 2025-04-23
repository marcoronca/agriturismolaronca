"use client";

import { DEFAULT_LOCALE } from "@/app/utils/locales";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SwitchLanguage() {
  const { lang } = useParams();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(
    lang === DEFAULT_LOCALE ? false : true
  );
  const handleChange = () => {
    const newStatus = !isChecked;
    const newLang = newStatus ? "en" : "it";
    setIsChecked(newStatus);
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
    router.replace(newPath);
  };
  return (
    <div className="flex items-center">
      <span className="mr-3 text-sm">
        <span className="text-sm font-semibold" id="lang_it">
          IT
        </span>
      </span>
      <button
        type="button"
        className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-700 transition-colors duration-200 ease-in-out"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={isChecked ? "lang_en" : "lang_it"}
        onClick={handleChange}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        ></span>
      </button>
      <span className="ml-3 text-sm" id="lang_en">
        <span className="text-sm font-semibold">EN</span>
      </span>
    </div>
  );
}
