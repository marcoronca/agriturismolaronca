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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLang = event.target.checked ? "en" : "it";
    setIsChecked(event.target.checked);
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm font-semibold">IT</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={isChecked}
          value={isChecked ? "en" : "it"}
          className="peer sr-only"
        />
        <div className="h-6 w-11 rounded-full  peer-focus:outline-none bg-gray-700"></div>
        <span className="absolute left-1 top-[50%] -translate-y-[50%] h-4 w-4 rounded-full bg-white transition-all duration-300 ease-in-out peer-checked:-translate-x-[100%] peer-checked:left-[calc(100%-0.25rem)] "></span>
      </label>
      <span className="text-sm font-semibold">EN</span>
    </div>
  );
}
