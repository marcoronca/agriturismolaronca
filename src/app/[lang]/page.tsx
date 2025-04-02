import { AppLocale } from "@/model/locale";
import HeroSection from "../components/HeroSection";
import { getPageContents } from "../actions/pageContents";
import { AppPages } from "@/model/app";
import { getPageMedias } from "../actions/pageMedia";

export default async function Home(props: {
  params: Promise<{ lang: AppLocale }>;
}) {
  const { lang } = await props.params;
  const homeContents = await getPageContents(lang, AppPages.Home);
  const homeMedia = await getPageMedias(lang, AppPages.Home);
  console.log(homeContents);
  return (
    <>
      <HeroSection
        title={homeContents.hero_section_title}
        subtitle={homeContents.hero_section_subtitle}
        buttonText={homeContents.hero_section_cta_text}
        buttonLink={homeContents.hero_section_cta_link}
        videoSrc={homeMedia.hero_section_video.url}
        videoType={homeMedia.hero_section_video.type}
      />
    </>
  );
}
