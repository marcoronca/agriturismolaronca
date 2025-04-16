import { AppContents } from "@/model/contents";
import { AppMedias } from "@/model/media";
import { HeaderSection } from "./ui/HeaderSection";
import { Card } from "./ui/Card";
import { getStructureSectionData } from "../utils/ui";

interface StructureSectionProps {
  homeContents: AppContents;
  homeMedia: AppMedias;
}

const StructureSection = (props: StructureSectionProps) => {
  const { homeContents, homeMedia } = props;

  const structureSectionsCardContents = getStructureSectionData(
    homeContents,
    homeMedia
  );
  if (structureSectionsCardContents.length === 0) {
    return <></>;
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <HeaderSection title={homeContents.structure_section_title} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {structureSectionsCardContents.map((structure, i) => (
            <Card
              key={i}
              cardClassName="bg-white"
              titleClassName="text-stone-700"
              descriptionClassName="text-stone-600"
              title={structure.title}
              description={structure.body}
              imageSrc={structure.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
