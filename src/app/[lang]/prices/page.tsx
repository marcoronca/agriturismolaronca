import { getPageContents } from "@/app/actions/pageContents";
import { getPageMedias } from "@/app/actions/pageMedia";
import { getRooms } from "@/app/actions/rooms";
import PriceTableSection from "@/app/components/PriceTableSection";
import { PricingCard } from "@/app/components/PricingCard";
import { HeaderSection } from "@/app/components/ui/HeaderSection";
import HeroSection from "@/app/components/ui/HeroSection";
import IconSwitch from "@/app/components/ui/icons/IconSwitch";
import { getRoomPriceForDate } from "@/app/utils/rooms";
import { getPricesInfoSectionData } from "@/app/utils/ui";
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

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <>
      <HeroSection
        title={pricesContents.hero_section_title}
        subtitle={pricesContents.hero_section_subtitle}
        imageSrc={pricesMedia.hero_section_image?.url}
      />

      <div className="container mx-auto px-4 py-16">
        <HeaderSection
          title="9 two-room apartments and 2 three-room apartments"
          subtitle="Take a look at the period of your stay and the type of apartment you want to book. You can also check the availability."
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
        <div className="divide-y divide-white overflow-hidden rounded-lg sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 max-w-7xl mx-auto">
          {getPricesInfoSectionData(pricesContents).map((info, i) => (
            <div
              key={info.title}
              className={classNames(
                i === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
                i === 1 ? "sm:rounded-tr-lg" : "",
                i === getPricesInfoSectionData(pricesContents).length - 2
                  ? "sm:rounded-bl-lg"
                  : "",
                i === getPricesInfoSectionData(pricesContents).length - 1
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
      </section>
    </>
  );
}
