import { AppContents } from "@/model/contents";
import { AppMedias } from "@/model/media";
import { getNumberOfElementsForSection } from "./content";


export const STRUCTURE_SECTION_PREFIX = "structure_section_" as const;
export const SURROUNDING_SECTION_PREFIX = "surrounding_section_" as const;
export const PRICES_INFO_SECTION_PREFIX = "prices_info_" as const;
export const SERVICES_SECTION_PREFIX = "services_" as const;


type SectionFieldMap<T> = {
    [K in keyof T]: (index: number, contents: AppContents, mediaContents?: AppMedias) => T[K];
};

type SectionData<T> = {
    [key in keyof T]: T[keyof T]
}

function getSectionData<T>(
    contents: AppContents,
    prefix: string,
    fields: SectionFieldMap<T>,
    mediaContents?: AppMedias
): SectionData<T>[] {
    const source = mediaContents ? { ...contents, ...mediaContents } : contents;
    const numElements = getNumberOfElementsForSection(source, prefix);

    if (numElements < 0) {
        return [];
    }

    return Array(numElements)
        .fill(null)
        .map((_, i) => {
            const obj = {} as SectionData<T>;
            for (const key of Object.keys(fields) as Array<keyof T>) {
                const getter = fields[key];
                obj[key] = getter(i + 1, contents, mediaContents);
            }
            return obj;
        });
}

export const getStructureSectionData = (contents: AppContents, mediaContents: AppMedias) =>
    getSectionData(
        contents,
        STRUCTURE_SECTION_PREFIX,
        {
            title: (i, c) => c[`${STRUCTURE_SECTION_PREFIX}${i}_title`] || "",
            body: (i, c) => c[`${STRUCTURE_SECTION_PREFIX}${i}_body`] || "",
            imageSrc: (i, _, m) => m?.[`${STRUCTURE_SECTION_PREFIX}${i}_image`]?.[0].url || "",
        },
        mediaContents
    );

export const getSurroundingsSectionData = (contents: AppContents) =>
    getSectionData(
        contents,
        SURROUNDING_SECTION_PREFIX,
        {
            title: (i, c) => c[`${SURROUNDING_SECTION_PREFIX}${i}_title`] || "",
            body: (i, c) => c[`${SURROUNDING_SECTION_PREFIX}${i}_body`] || "",
        }
    );

export const getPricesInfoSectionData = (contents: AppContents) =>
    getSectionData(
        contents,
        PRICES_INFO_SECTION_PREFIX,
        {
            title: (i, c) => c[`${PRICES_INFO_SECTION_PREFIX}${i}_title`] || "",
            body: (i, c) => c[`${PRICES_INFO_SECTION_PREFIX}${i}_body`] || "",
            icon: (i, c) => c[`${PRICES_INFO_SECTION_PREFIX}${i}_icon`] || "",
        }
    );

export const getServicesSectionData = (contents: AppContents, mediaContents: AppMedias) =>
    getSectionData(
        contents,
        SERVICES_SECTION_PREFIX,
        {
            title: (i, c) => c[`${SERVICES_SECTION_PREFIX}${i}_title`] || "",
            description: (i, c) => c[`${SERVICES_SECTION_PREFIX}${i}_body`] || "",
            images: (i, _, m) => m?.[`${SERVICES_SECTION_PREFIX}${i}_images`]?.map(media => media.url) || [],
        },
        mediaContents
    );