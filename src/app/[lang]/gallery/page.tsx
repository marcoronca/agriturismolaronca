import { getPageContents } from "@/app/actions/pageContents";
import { getPageMedias } from "@/app/actions/pageMedia";
import GridEffect from "@/app/components/ui/bg-effects/GridEffect";
import { AppPages } from "@/model/app";
import { AppLocale } from "@/model/locale";
import Image from "next/image";

export default async function Gallery(props: {
  params: Promise<{ lang: AppLocale }>;
}) {
  const { lang } = await props.params;
  const [contents, media] = await Promise.all([
    getPageContents(lang, AppPages.Gallery),
    getPageMedias(lang, AppPages.Gallery),
  ]);

  const gallery = media.gallery || [];

  return (
    <>
      <div className={`relative isolate bg-stone-100`}>
        <div className="mx-auto max-w-7xl">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <GridEffect className="border-r-0 w-full lg:w-full" />
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {contents.gallery}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((image, index) => (
            <div key={index} className="relative pb-[100%]">
              <div className="absolute inset-0">
                <Image
                  src={image.url || "/images/logoRonca.png"}
                  alt={"Agriturismo La Ronca"}
                  width={500}
                  height={500}
                  className="rounded-lg transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
