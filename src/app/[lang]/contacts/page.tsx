import { getPageContents } from "@/app/actions/pageContents";
import GridEffect from "@/app/components/ui/bg-effects/GridEffect";
import { AppPages } from "@/model/app";
import { AppLocale } from "@/model/locale";
import { farm } from "@lucide/lab";
import {
  Icon,
  MailIcon,
  MapPinnedIcon,
  PhoneIcon,
  SmartphoneIcon,
} from "lucide-react";

export default async function Page(props: {
  params: Promise<{ lang: AppLocale }>;
}) {
  const { lang } = await props.params;
  const contents = await getPageContents(lang, AppPages.Contact);

  return (
    <div className="relative isolate bg-stone-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <GridEffect />
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              {contents.contacts_title}
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              {contents.contacts_subtitle}
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{contents.address}</span>
                  <Icon
                    iconNode={farm}
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  F.lli Roncareggi Andrea e Luigi s.s.
                  <br />
                  {contents.vat}&nbsp;{contents.vat_number}
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{contents.address}</span>
                  <MapPinnedIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=Via+della+Caduta,+13,+57027+San+Vincenzo+(LI)`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Via della Caduta, 13
                    <br />
                    57027 San Vincenzo (LI)
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{contents.phone}</span>
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  <a
                    href={`tel:${contents.phone_number}`}
                    className="hover:text-gray-900"
                  >
                    {contents.phone_number}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{contents.phone}</span>
                  <SmartphoneIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  <a
                    href={`tel:${contents.phone_mobile_number}`}
                    className="hover:text-gray-900"
                  >
                    {contents.phone_mobile_number}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <MailIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  <a
                    href={`mailto:${contents.email_to}`}
                    className="hover:text-gray-900"
                  >
                    {contents.email_to}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2915.4233000319164!2d10.549220999999998!3d43.053564!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d61ec087731aaf%3A0x164a5fed4003aea6!2sAgriturismo+La+Ronca!5e0!3m2!1sit!2sit!4v1413193107748"
              width="700"
              height="500"
              className="border-0 rounded-md"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
