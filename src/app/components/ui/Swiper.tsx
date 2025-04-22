"use client";

import { Children } from "react";
import { SwiperOptions } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

interface SwiperProps extends SwiperOptions {
  children: React.ReactNode;
  className?: string;
}

const SwiperWrapper = (props: SwiperProps) => {
  const { children, className, ...swiperProps } = props;

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      loop={false}
      navigation={true}
      className={`swiper-container ${className}`}
      {...swiperProps}
    >
      {Children.map(children, (child, index) => (
        <SwiperSlide key={index} className="swiper-slide">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperWrapper;
