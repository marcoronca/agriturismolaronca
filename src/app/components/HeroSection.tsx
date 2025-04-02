import Image from "next/image";
import Link from "next/link";
import Button from "./ui/button/Button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  videoSrc?: string;
  videoType?: string;
}

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
  videoSrc,
  videoType = "video/mp4", // Default video type
}: HeroSectionProps) {
  const mediaType = imageSrc ? "image" : "video";
  // Optional: Handle videoSrc if needed in the future
  return (
    <section className="relative h-[70vh]">
      {mediaType == "image" ? (
        <Image
          src={imageSrc || "/images/logoRonca.png"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
      ) : (
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          poster="/images/logoRonca.png"
        >
          <source src={videoSrc} type={videoType} />
          Your browser does not support the video tag.
        </video>
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
