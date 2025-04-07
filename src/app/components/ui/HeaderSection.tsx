interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function HeaderSection({
  title,
  subtitle,
  centered = true,
  className = "",
}: HeaderSectionProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl font-bold mb-4 text-stone-800">{title}</h2>
      {subtitle && (
        <p className="text-lg text-stone-600 max-w-3xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
