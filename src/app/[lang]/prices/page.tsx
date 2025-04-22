import { getPageContents } from "@/app/actions/pageContents";
import { getPageMedias } from "@/app/actions/pageMedia";
import { getRooms } from "@/app/actions/rooms";
import OtherInfo from "@/app/components/OtherInfo";
import PriceTableSection from "@/app/components/PriceTableSection";
import { PricingCard } from "@/app/components/PricingCard";
import { HeaderSection } from "@/app/components/ui/HeaderSection";
import HeroSection from "@/app/components/ui/HeroSection";
import { getRoomPriceForDate } from "@/app/utils/rooms";
import { AppPages } from "@/model/app";
import { AppLocale } from "@/model/locale";

export default async function Prices(props: {
  params: Promise<{ lang: AppLocale }>;
}) {
  const { lang } = await props.params;
  const [pricesContents, pricesMedia, rooms] = await Promise.all([
    getPageContents(lang, AppPages.Prices),
    getPageMedias(lang, AppPages.Prices),
    getRooms(lang),
  ]);

  return (
    <>
      <HeroSection
        title={pricesContents.hero_section_title}
        subtitle={pricesContents.hero_section_subtitle}
        imageSrc={pricesMedia.hero_section_image?.[0].url}
      />

      <div className="container mx-auto px-4 py-16">
        <HeaderSection
          title={pricesContents.prices_section_rooms_title}
          subtitle={pricesContents.prices_section_rooms_subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto">
          {rooms.map((room) => (
            <PricingCard
              key={room.id}
              name={room.name}
              imageSrc={room.images[0]?.url}
              contents={pricesContents}
              price={getRoomPriceForDate(room.prices, new Date())}
              features={room.features}
            />
          ))}
        </div>
      </div>

      <PriceTableSection contents={pricesContents} rooms={rooms} />

      <section className="mt-6">
        <HeaderSection
          centered={false}
          className="px-4 md:px-0 max-w-7xl mx-auto"
          title={pricesContents.other_information}
        />
        <OtherInfo contents={pricesContents} />
      </section>
    </>
  );
}
