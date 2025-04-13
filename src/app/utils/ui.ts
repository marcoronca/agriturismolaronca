import { AppContents } from "@/model/contents";
import { AppMedias } from "@/model/media";
import { getNumberOfElementsForSection } from "./content";

export const STRUCTURE_SECTION_PREFIX = "structure_section_" as const;
export const SURROUNDING_SECTION_PREFIX = "surrounding_section_" as const;
export const PRICES_INFO_SECTION_PREFIX = "prices_info_" as const;

export const getStructureSectionData = (contents: AppContents, mediaContents: AppMedias) => {
    const structureSectionsElements = getNumberOfElementsForSection(
        { ...contents, ...mediaContents },
        STRUCTURE_SECTION_PREFIX
    );

    if (structureSectionsElements < 0) {
        return [];
    }
    const structureSectionsCardContents = Array(structureSectionsElements)
        .fill(null)
        .map((_, i) => ({
            title: contents[`${STRUCTURE_SECTION_PREFIX}${i + 1}_title`] || "",
            body: contents[`${STRUCTURE_SECTION_PREFIX}${i + 1}_body`] || "",
            imageSrc: mediaContents[`${STRUCTURE_SECTION_PREFIX}${i + 1}_image`]?.url || "",
        }));
    return structureSectionsCardContents;
}

export const getSurroundingsSectionData = (contents: AppContents) => {
    const surroundingsSectionsElements = getNumberOfElementsForSection(contents, SURROUNDING_SECTION_PREFIX);

    if (surroundingsSectionsElements < 0) {
        return [];
    }
    const surroundingsSectionsCardContents = Array(surroundingsSectionsElements)
        .fill(null)
        .map((_, i) => ({
            title: contents[`${SURROUNDING_SECTION_PREFIX}${i + 1}_title`] || "",
            body: contents[`${SURROUNDING_SECTION_PREFIX}${i + 1}_body`] || "",
        }));
    return surroundingsSectionsCardContents;
}


export const getPricesInfoSectionData = (contents: AppContents) => {
    const pricesInfoSectionsElements = getNumberOfElementsForSection(contents, PRICES_INFO_SECTION_PREFIX);

    if (pricesInfoSectionsElements < 0) {
        return [];
    }
    const pricesInfoSectionsCardContents = Array(pricesInfoSectionsElements)
        .fill(null)
        .map((_, i) => ({
            title: contents[`${PRICES_INFO_SECTION_PREFIX}${i + 1}_title`] || "",
            body: contents[`${PRICES_INFO_SECTION_PREFIX}${i + 1}_body`] || "",
            icon: contents[`${PRICES_INFO_SECTION_PREFIX}${i + 1}_icon`] || "",
        })
        );
    return pricesInfoSectionsCardContents;
}