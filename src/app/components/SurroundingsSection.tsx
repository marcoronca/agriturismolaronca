import { AppContents } from "@/model/contents";
import { HeaderSection } from "./ui/HeaderSection";
import { Card } from "./ui/Card";
import { getSurroundingsSectionData } from "../utils/ui";

interface SurroundingsSectionProps {
  homeContents: AppContents;
}

const SurroundingsSection = (props: SurroundingsSectionProps) => {
  const { homeContents } = props;

  const surroundingSectionsCardContents =
    getSurroundingsSectionData(homeContents);

  if (surroundingSectionsCardContents.length === 0) {
    return <></>;
  }

  return (
    <section className="py-16 bg-white-50">
      <div className="container mx-auto px-4">
        <HeaderSection title={homeContents.surrounding_section_title} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {surroundingSectionsCardContents.map((structure, i) => (
            <Card
              key={i}
              title={structure.title}
              description={structure.body}
              cardClassName="bg-stone-200"
              titleClassName="text-stone-700 text-center"
              descriptionClassName="text-stone-600 text-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SurroundingsSection;
