import React from "react";
import IconSwitch from "./ui/icons/IconSwitch";
import { getPricesInfoSectionData } from "../utils/ui";
import { AppContents } from "@/model/contents";

interface OtherInfoProps {
  contents: AppContents;
}

export default function OtherInfo({ contents }: OtherInfoProps) {
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="divide-y divide-white overflow-hidden rounded-lg sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 max-w-7xl mx-auto">
      {getPricesInfoSectionData(contents).map((info, i) => (
        <div
          key={info.title}
          className={classNames(
            i === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
            i === 1 ? "sm:rounded-tr-lg" : "",
            i === getPricesInfoSectionData(contents).length - 2
              ? "sm:rounded-bl-lg"
              : "",
            i === getPricesInfoSectionData(contents).length - 1
              ? "rounded-br-lg rounded-bl-lg sm:rounded-bl-none"
              : "",
            "group relative p-6"
          )}
        >
          <div>
            <span
              className={
                "bg-stone-50 text-stone-700 inline-flex rounded-lg p-3 ring-4 ring-white"
              }
            >
              <IconSwitch icon={info.icon} />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold text-gray-900">
              <span aria-hidden="true" className="absolute inset-0" />
              {info.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{info.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
