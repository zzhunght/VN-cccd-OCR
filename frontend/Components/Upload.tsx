"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { ViewDirection } from "../Contants";
interface UploadProps {
  imageSrc: Array<string>;
  setImageSrc: (I: Array<string>) => void;
  handleDownload: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleExportExcel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  excelFile: string; // Thêm dòng này
  setExcelFile: React.Dispatch<React.SetStateAction<string>>; // Thêm dòng này
}
const Upload = ({
  imageSrc,
  setImageSrc,
  handleDownload,
  handleExportExcel,
  excelFile, // Use the excelFile from props
  setExcelFile
}: UploadProps) => {
  const handleUploadExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    //lưu file excel vào biến excelFile
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target === null) return;
          if (typeof e.target.result === "string") {
            setExcelFile(e.target.result); // Use setExcelFile from props
            console.log(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

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
    <div className="rounded-md shadow-2 px-5 pt-5 pb-10">
      <h2 className="font-bold text-24 text-center px-5 py-3">
        Ảnh Căn cước công dân của bạn{" "}
      </h2>
      <div className=" flexmd-center md:gap-2 border-1-dashed-AAAAAA px-5 py-4">
        {ViewDirection.map((item: string, index: number) => (
          <div className="md:basis-1/2 text-center " key={index}>
            <h3 className="text-20 font-semibold py-5">{item}</h3>
            <div className=" md:h-[320px] h-[240px]">
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
            <div className="py-8">
              <label className="bg-oy text-white py-3 px-5 rounded-md">
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
      <div>
          <label className="bg-g py-2 px-3 rounded-md">
            <span>Chọn file Excel</span>
            <input
              type="file"
              className="hidden"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleUploadExcel}
            ></input>
          </label>
        </div>
        <button
          onClick={handleExportExcel}
          className="bg-g py-2 px-3 rounded-md"
        >
          Xuất excel
        </button>
        <button onClick={handleDownload} className="bg-oy py-2 px-3 rounded-md">
          Chọn biểu mẫu thông tin
        </button>

      </div>
    </div>
  );
};

export default Upload;
