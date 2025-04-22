import Image from "next/image";
import SwiperWrapper from "./Swiper";

interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  imagesCarousel?: string[];
}

export function Card({
  title,
  description,
  imageSrc,
  cardClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  imagesCarousel = [],
}: CardProps) {
  // Determine if we have carousel images available
  const hasCarouselImages = imagesCarousel.length > 0;

  // Determine which type of image display to use
  const imageDisplayType = hasCarouselImages
    ? "swiper"
    : imageSrc
    ? "single"
    : null;

  return (
    <div className={`p-6 rounded-lg shadow-md ${cardClassName}`}>
      {imageDisplayType === "single" && (
        <Image
          src={imageSrc || "/images/logoRonca.png"}
          alt={title}
          width={500}
          height={300}
          className="rounded-lg mb-4 w-full h-48 object-cover"
        />
      )}
      {imageDisplayType === "swiper" && (
        <SwiperWrapper className="mb-4 swiper-card">
          {imagesCarousel.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`${title} image ${index + 1}`}
              width={500}
              height={300}
              className="rounded-lg w-full h-48 object-cover"
            />
          ))}
        </SwiperWrapper>
      )}
      <h3 className={`text-xl font-semibold mb-4 ${titleClassName}`}>
        {title}
      </h3>
      <p className={descriptionClassName}>{description}</p>
    </div>
  );
}
