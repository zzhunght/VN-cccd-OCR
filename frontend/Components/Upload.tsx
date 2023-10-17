"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { ViewDirection } from "../Contants";
interface UploadProps {
  imageSrc: Array<string>;
  setImageSrc: (I: Array<string>) => void;
  handleDownload: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleExportExcel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Upload = ({
  imageSrc,
  setImageSrc,
  handleDownload,
  handleExportExcel,
}: UploadProps) => {
  const handleUploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(e);
    // truyền index vào nếu 0 tức là ảnh mặt trước còn 1 là mặt sau
    //sau khi đọc xong lưu vào mảng imageSrc
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target === null) return;
          const CopyImageSrc: Array<string> = [...imageSrc];
          if (typeof e.target.result === "string") {
            CopyImageSrc[index] = e.target.result;
            setImageSrc(CopyImageSrc);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  return (
    <div className="basis-2/3 rounded-md shadow-2 px-5 pt-5 pb-10">
      <h2 className="font-bold text-24 text-center px-5 py-3">
        Ảnh Căn cước công dân của bạn{" "}
      </h2>
      <div className=" flex-center gap-2 border-1-dashed-AAAAAA px-5 py-4">
        {ViewDirection.map((item: string, index: number) => (
          <div className="basis-1/2 text-center " key={index}>
            <h3 className="text-20 font-semibold my-5">{item}</h3>
            <div className="mb-5 h-[320px]">
              {imageSrc[index] ? ( // kiểm tra từng mặt cái nào đã tải thì hiện lên không thì hiện thẻ div bên dưới
                <div className="h-full">
                  <Image
                    src={imageSrc[index]}
                    alt="Ảnh đã tải lên"
                    className="rounded-md object-contain w-full h-full hover:opacity-80 
            transition-opacity duration-300 "
                    width={100}
                    height={100}
                  />
                </div>
              ) : (
                <div className="p-3 border-2-solid-AAAAAA h-full">
                  <h4>Ảnh được tải lên sẽ hiển thị ở đây</h4>
                </div>
              )}
            </div>
            <div className="my-8">
              <label className="bg-oy text-white py-3 px-5 rounded-md mb-5 ">
                <span>Chọn tệp hình ảnh</span>
                <input
                  type="file"
                  accept="Image/*"
                  className="hidden"
                  onChange={(e) => handleUploadImage(e, index)}
                  onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                    (e.target as HTMLInputElement).value = "";
                  }}
                ></input>
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex-2center  gap-5 text-white">
        <button
          onClick={handleExportExcel}
          className="bg-g py-2 px-3 rounded-md"
        >
          Xuất excel
        </button>
        <button onClick={handleDownload} className="bg-oy py-2 px-3 rounded-md">
          Tải về biểu mẫu thông tin
        </button>
      </div>
    </div>
  );
};

export default Upload;
