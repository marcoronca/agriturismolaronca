import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function Card({
  title,
  description,
  imageSrc,
  cardClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: CardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${cardClassName}`}>
      {imageSrc && (
        <Image
          src={imageSrc || "/images/logoRonca.png"}
          alt={title}
          width={500}
          height={300}
          className="rounded-lg mb-4 w-full h-48 object-cover"
        />
      )}
      <h3 className={`text-xl font-semibold mb-4 ${titleClassName}`}>
        {title}
      </h3>
      <p className={descriptionClassName}>{description}</p>
    </div>
  );
}
