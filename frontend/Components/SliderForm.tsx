"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface FunctionProps {
  setSelected: (n: number) => void;
  selected: number;
  showForm: boolean;
  setShowForm: (b: boolean) => void;
  imageSrc: Array<string>;
  setImageSrc: (I: Array<string>) => void;
  setWarning: (b: boolean) => void;
}
interface itemProps {
  content: string;
  url: string;
}
const SliderForm = ({
  setSelected,
  selected,
  setShowForm,
  showForm,
  setImageSrc,
  imageSrc,
  setWarning,
}: FunctionProps) => {
  //slide nào được chọn thì 2light
  const handleSelected = async (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (selected === index) {
      setSelected(-1);
    } else {
      setSelected(index);
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (imageSrc.length !== 2) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 8000); // lát tao làm warning sau
    }
    const data = { selected, imageSrc }; //selected là chỉ mục của form còn imageSrc là 2 ảnh
    //xử lí ở đây
    //sau khi xong thì reset
    setSelected(-1);
    setImageSrc([]);
    setShowForm(false);
  };
  // const CustomPrevButton = (
  //   { onClick }: CustomSlideButtonProps //custom lại 2 cái nút chuyển slide
  // ) => (
  //   <button
  //     className="arrow-slider-custom-l
  //   "
  //     onClick={onClick}
  //   >
  //     <FontAwesomeIcon icon={faArrowLeft} />
  //   </button>
  // );
  // const CustomNextButton = ({ onClick }: CustomSlideButtonProps) => (
  //   <button className="arrow-slider-custom-r" onClick={onClick}>
  //     <FontAwesomeIcon icon={faArrowRight} />
  //   </button>
  // );
  const items = [
    { content: "Sơ yếu lí lịch", url: "/Form/soyeulilich.jpg" },
    {
      content: "Đơn xin tạm trú tạm vắng",
      url: "/Form/donxintamtrutamvang.jpg",
    },
    { content: "Đơn xin đăng kí tạm trú", url: "/Form/donxindangkytamtru.jpg" },
  ];
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    initialSlide: 0,
    speed: 200,
    infinite: true,
    rows: 1,
    useCSS: true,
    // dots: true, //setting slider
    // autoplay: true,
    // autoplaySpeed: 3000,
    // pauseOnHover: true,
    // prevArrow: (
    //   <CustomPrevButton
    //     onClick={function (): void {
    //       throw new Error("Function not implemented.");
    //     }}
    //   />
    // ),
    // nextArrow: (
    //   <CustomNextButton
    //     onClick={function (): void {
    //       throw new Error("Function not implemented.");
    //     }}
    //   />
    // ),
  };
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 content shadow-2 border-1-dashed-AAAAAA bg-white">
      <div>
        <FontAwesomeIcon
          icon={faDeleteLeft}
          className="float-right text-32 text-bb cursor-pointer"
          onClick={(e) => {
            setShowForm(false);
            setSelected(-1);
          }}
        />
      </div>
      <div className="pt-10 px-10">
        <Slider {...settings}>
          {items.map((item: itemProps, index: number) => (
            <div
              className={`text-center font-semibold text-16 p-2 rounded-md pt-10 
              ${selected === index ? "slideselected" : ""}`}
              key={index}
              onClick={(e) => handleSelected(e, index)}
            >
              <Image
                src={item.url}
                alt="error"
                height={400}
                width={200}
                className="content border-1-solid-b shadow-2"
              />
              <h4 className="py-10">{item.content}</h4>
            </div>
          ))}
        </Slider>
      </div>
      <div className="text-center py-5 ">
        <button
          className="bg-oy text-white px-7 py-3 rounded-md"
          onClick={handleSubmit}
        >
          Chọn
        </button>
      </div>
    </div>
  );
};

export default SliderForm;
