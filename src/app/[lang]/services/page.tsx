import { getPageContents } from "@/app/actions/pageContents";
import { getPageMedias } from "@/app/actions/pageMedia";
import { Card } from "@/app/components/ui/Card";
import { HeaderSection } from "@/app/components/ui/HeaderSection";
import HeroSection from "@/app/components/ui/HeroSection";
import { getServicesSectionData } from "@/app/utils/ui";
import { AppPages } from "@/model/app";
import { AppLocale } from "@/model/locale";

export default async function Services(props: {
  params: Promise<{ lang: AppLocale }>;
}) {
  const { lang } = await props.params;
  const [contents, media] = await Promise.all([
    getPageContents(lang, AppPages.Services),
    getPageMedias(lang, AppPages.Services),
  ]);

  const services = getServicesSectionData(contents, media);

  return (
    <div>
      <HeroSection
        title={contents.hero_section_title}
        imageSrc={media.hero_section_image?.[0].url}
        subtitle=""
      />

      <div className="container mx-auto px-4 py-16">
        <HeaderSection title={contents.header_section_title} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service.title as string}
              title={service.title as string}
              description={service.description as string}
              imagesCarousel={service.images as string[]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
