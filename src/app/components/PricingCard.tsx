import { AppContents } from "@/model/contents";
import RoomStatus from "./ui/RoomStatus";
import { Price } from "@/model/prices";
import { showRoomPrice } from "../utils/rooms";
import Image from "next/image";
import MailToButton from "./ui/MailToButton";
import { Media } from "@/model/media";
import SwiperWrapper from "./ui/Swiper";

interface PricingCardProps {
  name: string;
  price?: Price;
  features: string[];
  images?: Media[];
  contents: AppContents;
}

export function PricingCard({
  name,
  price,
  images,
  features,
  contents,
}: PricingCardProps) {
  const period =
    price?.from.dateUi && price?.to.dateUi
      ? `${price.from.dateUi} - ${price.to.dateUi}`
      : "";
  const priceValue = showRoomPrice(contents)(price);
  return (
    <div className={`bg-white p-8 rounded-lg shadow-md flex flex-col`}>
      <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 mb-3">
        <div className="flex basis-1/2 flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-stone-700">{name}</h2>
          <p className="text-4xl font-bold text-stone-800">{priceValue}</p>
        </div>
        <div className="basis-1/2 text-sm font-medium text-stone-500 flex flex-col sm:items-end space-y-2">
          <RoomStatus status={price?.status || ""} contents={contents} />
          {period && (
            <span className="text-sm font-normal break-all">{period}</span>
          )}
        </div>
      </div>
      {images && images.length > 0 && (
        <SwiperWrapper className="mb-4 w-full rounded-lg swiper-card">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt={name || "Agriturismo La Ronca"}
              height={200}
              width={300}
              className="object-cover w-full"
            />
          ))}
        </SwiperWrapper>
      )}
      <ul className="mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 text-stone-600">
            • {feature}
          </li>
        ))}
      </ul>
      <div className="flex flex-col space-y-2">
        <MailToButton
          variant="primary"
          email={contents.email_to}
          size="lg"
          body={contents.email_body
            ?.replaceAll("{room}", name)
            .replaceAll("{request_type}", contents.cta_book_now || "")}
          subject={contents.email_subject?.replaceAll(
            "{request_type}",
            contents.cta_book_now || ""
          )}
        >
          {contents.cta_book_now}
        </MailToButton>
        <MailToButton
          variant="outline"
          email={contents.email_to}
          size="lg"
          body={contents.email_body
            ?.replaceAll("{room}", name)
            .replaceAll("{request_type}", contents.cta_more_info || "")}
          subject={contents.email_subject?.replaceAll(
            "{request_type}",
            contents.cta_more_info || ""
          )}
        >
          {contents.cta_more_info}
        </MailToButton>
      </div>
    </div>
  );
}
