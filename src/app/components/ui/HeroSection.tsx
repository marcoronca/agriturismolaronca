import Link from "next/link";
import Button from "./button/Button";
import ImageExt from "./ImageExt";
import VideoExt from "./VideoExt";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  videoSrc?: string;
  videoType?: string;
  fallbackSrc: string;
}

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
  videoSrc,
  fallbackSrc = "/images/logoRonca.png",
  videoType = "video/mp4",
}: HeroSectionProps) {
  return (
    <section className="relative h-[70vh]">
      {imageSrc ? (
        <ImageExt
          src={imageSrc}
          alt={title || "Agriturismo La Ronca"}
          fallbackUrl={fallbackSrc}
          width="2560"
          height="100"
          className="brightness-75 object-cover w-full h-full"
        />
      ) : (
        <VideoExt
          src={videoSrc || ""}
          type={videoType}
          fallbackUrl={fallbackSrc}
          className="brightness-75 object-cover w-full h-full"
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 px-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl px-4">{subtitle}</p>
        {buttonText && buttonLink && (
          <Link href={buttonLink}>
            <Button variant="primary" size="lg">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
