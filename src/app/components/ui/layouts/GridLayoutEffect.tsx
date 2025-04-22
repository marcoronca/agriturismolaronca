import React from "react";
import GridEffect from "../bg-effects/GridEffect";

interface GridLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export default function GridLayoutEffect({
  leftContent,
  rightContent,
  className = "",
}: GridLayoutProps) {
  return (
    <div className={`relative isolate bg-stone-50 ${className}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <GridEffect />
            {leftContent}
          </div>
        </div>
        <div className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
}
