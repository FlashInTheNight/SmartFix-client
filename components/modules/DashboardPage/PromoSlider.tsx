"use client";
import Image from "next/image";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";


import slider_1 from "@/public/img/slider/slider_1.png";
import slider_2 from "@/public/img/slider/slider_2.png";
import slider_3 from "@/public/img/slider/slider_3.png";
import slider_4 from "@/public/img/slider/slider_4.png";


import BrandsSliderPrevArrow from "@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow";
import BrandsSliderNextArrow from "@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow";

import styles from "@/styles/dashboard/index.module.scss";
import swiperStyles from "@/styles/promoSlider/index.module.scss";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

import { useAppSelector } from "@/lib/hooks";
import { useCallback, useRef } from "react";



const PromoSlider = () => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";
  const darkModeSwiperClass = currentThemeMode === "dark" ? `${swiperStyles.swiper_container__dark_mode}` : '';

    const sliderRef = useRef<SwiperRef | null>(null);

    const handlePrev = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideNext();
    }, []);

  return (
    <div className={swiperStyles.swiper_wrapper}>
      <Swiper
        className={`${swiperStyles.swiper_container} ${darkModeSwiperClass}`}
        // install Swiper modules
        ref={sliderRef}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
      >
        <SwiperSlide>
          <Image
            src={slider_1}
            alt="promo"
            className={swiperStyles.swiper_item}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={slider_2}
            alt="promo"
            className={swiperStyles.swiper_item}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={slider_3}
            alt="promo"
            className={swiperStyles.swiper_item}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={slider_4}
            alt="promo"
            className={swiperStyles.swiper_item}
          />
        </SwiperSlide>
      </Swiper>
      <BrandsSliderPrevArrow
        positionClass={swiperStyles.navigation_btn}
        modeClass={darkModeClass}
        onClick={handlePrev}
      />
      <BrandsSliderNextArrow
        modeClass={darkModeClass}
        onClick={handleNext}
        positionClass={swiperStyles.navigation_btn}
      />
    </div>
  );
};

export default PromoSlider;
