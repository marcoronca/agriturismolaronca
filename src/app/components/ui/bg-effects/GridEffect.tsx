interface GridEffectProps {
  className?: string;
}

const GridEffect = ({ className = "" }: GridEffectProps) => {
  return (
    <div
      className={`absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-stone-100 border-r-1 border-gray-700/5 lg:w-1/2 ${className}`}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
      >
        <defs>
          <pattern
            x="100%"
            y={-1}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M130 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <rect fill="white" width="100%" height="100%" strokeWidth={0} />
        <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
          <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
        </svg>
        <rect
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
    </div>
  );
};

export default GridEffect;
