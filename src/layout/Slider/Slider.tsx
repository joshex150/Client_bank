import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import sliderData from "../../data/sliderData";
import { Button } from "../../components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { isMobile } from "react-device-detect";
import "./Slider.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Slider() {
  const showCurrentSlide = (slides: HTMLDivElement[], index: number): void => {
    for (const item of slides) {
      item.classList.remove("show");
    }
    slides[index].classList.add("show");
  };

  useEffect(() => {
    if (isMobile) {
      console.log(isMobile);
    }
  }, []);

  const handleCurrentSldier = (e: any): void => {
    const sliderContent: HTMLDivElement[] = [
      ...e.$el[0].querySelectorAll(".slider-item__content"),
    ];
    showCurrentSlide(sliderContent, e.activeIndex);
  };
  return (
    <>
      <Swiper
        spaceBetween={60}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData.map((slider, i) => (
          <SwiperSlide
            key={i}
            style={{
              background: isMobile
                ? `url(${slider.mobileImgUrl})`
                : `url(${slider.imgUrl})`,
              backgroundSize: "cover",
            }}
            className="slider-item tinted-background"
          >
            <div className="slider-item__content">
              <h2
                className="slider-title"
                style={{ zIndex: "9999", color: "white", position: "relative", margin: "0px 11px" }}
              >
                {slider.title}
              </h2>
              <p className="slider-des" style={{ zIndex: "9999", color: "white", position: "relative" }}>{slider.description}</p>
              <div className="slider-buttons">
                <Button style={{ zIndex: "9999", color: "white", position: "relative" }}>To shop</Button>
                <Button style={{ color: "black", backgroundColor: "white", zIndex: "9999", position: "relative" }}>
                  Read More
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
