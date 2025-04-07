import { AppLocale } from "@/model/locale";
import HeroSection from "../components/ui/HeroSection";
import { getPageContents } from "../actions/pageContents";
import { AppPages } from "@/model/app";
import { getPageMedias } from "../actions/pageMedia";
import { HeaderSection } from "../components/ui/HeaderSection";
import StructureSection from "../components/StructureSection";
import SurroundingsSection from "../components/SurroundingsSection";

export default async function Home(props: {
  params: Promise<{ lang: AppLocale }>;
}) {
  const { lang } = await props.params;
  const homeContents = await getPageContents(lang, AppPages.Home);
  const homeMedia = await getPageMedias(lang, AppPages.Home);

  return (
    <>
      <HeroSection
        title={homeContents.hero_section_title}
        subtitle={homeContents.hero_section_subtitle}
        buttonText={homeContents.hero_section_cta_text}
        buttonLink={homeContents.hero_section_cta_link}
        videoSrc={homeMedia.hero_section_video?.url}
        imageSrc={homeMedia.hero_section_image?.url}
        videoType={homeMedia.hero_section_video?.type}
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <HeaderSection
            title={homeContents.header_section_title}
            subtitle={homeContents.header_section_subtitle}
          />
        </div>
      </section>

      <StructureSection homeContents={homeContents} homeMedia={homeMedia} />
      <SurroundingsSection homeContents={homeContents} />
    </>
  );
}
