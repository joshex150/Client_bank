import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import sliderData from "../../data/sliderData";
import { Button } from "../../components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
          style={{ background: `url(${slider.imgUrl})` }}
          className="slider-item"
        >
          <div className="slider-item__content">
            <h2 className="slider-title">{slider.title}</h2>
            <p className="slider-des">{slider.description}</p>
            <div className="slider-buttons">
              <Button >To shop</Button>
              <Button
                style={{ color: "black", backgroundColor: "white" }}
              >
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
