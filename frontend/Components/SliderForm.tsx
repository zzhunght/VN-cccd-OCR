"use client";
import React, { useState, useEffect } from "react";
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
  setMessage: (message: string) => void;
  setStatus: (s: string) => void;
}
interface CustomSlideButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  setMessage,
  setStatus,
}: FunctionProps) => {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [changeSetting, setChangeSetting] = useState({});
  const [lastClickTime, setLastClickTime] = useState(0);
  const minClickInterval = 4000;
  // useEffect(() => {
  //   const handleResize = () => {
  //     console.log(window.innerWidth);
  //     setWindowWidth(window.innerWidth);
  //     console.log(windowWidth);
  //   };
  //   if (windowWidth >= 768) {
  //     setChangeSetting({ ...settings });
  //   } else {
  //     setChangeSetting({ ...settings1 });
  //   }
  //   // Đăng ký sự kiện lắng nghe thay đổi kích thước màn hình
  //   window.addEventListener("resize", handleResize);
  //   // Hủy đăng ký sự kiện khi component bị unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [windowWidth]);
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
    if (imageSrc.length !== 2 || selected === -1) {
      const currentTime = Date.now();
      if (currentTime - lastClickTime >= minClickInterval) {
        setWarning(true);
        if (selected === -1) {
          setMessage("Bạn chưa chọn loại biểu mẫu");
          setStatus("Warning");
        } else {
          setMessage("Bạn chưa cung cấp đủ 2 ảnh cho chúng tôi");
          setStatus("Warning");
        }
        setTimeout(() => {
          setWarning(false);
        }, 4000); // lát tao làm warning sau
        setLastClickTime(currentTime);
      }
    }
    const data = { selected, imageSrc }; //selected là chỉ mục của form còn imageSrc là 2 ảnh
    //xử lí ở đây
    //sau khi xong thì resets
    setSelected(-1);
    setImageSrc([]);
    setShowForm(false);
  };
  const CustomPrevButton = (
    { onClick }: CustomSlideButtonProps //custom lại 2 cái nút chuyển slide
  ) => (
    <button
      className="arrow-slider-custom-l
    "
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
  const CustomNextButton = ({ onClick }: CustomSlideButtonProps) => (
    <button className="arrow-slider-custom-r" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
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
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
          speed: 200,
          prevArrow: (
            <CustomPrevButton
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ),
          nextArrow: (
            <CustomNextButton
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ),
        },
      },
    ],
  };
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 
    content shadow-2 border-1-dashed-AAAAAA bg-white"
    >
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
              <h4 className="py-5">{item.content}</h4>
            </div>
          ))}
        </Slider>
      </div>
      <div className="text-center pb-5 md:py-5">
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
