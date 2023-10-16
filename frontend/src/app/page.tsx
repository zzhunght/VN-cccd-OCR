"use client";
import { useState, useRef } from "react";
import Introduction from "../../Components/Introduction";
import Upload from "../../Components/Upload";
import SliderForm from "../../Components/SliderForm";
import Guide from "../../Components/Guide";
import Warning from "./../../Components/Warning";
export default function Home() {
  const [imageSrc, setImageSrc] = useState([""]);
  const [selected, setSelected] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [warning, setWarning] = useState(false);
  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowForm(true);
  };
  const handleExportExcel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (imageSrc.length !== 2) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 8000);
    }
    console.log(imageSrc); //data là 2 file ảnh lưu trong biến imageSrc
    //xử lí ở đây
    setImageSrc([]); // xong rồi reset lại
  };
  return (
    <div className="content">
      {warning ? <Warning setWarning={setWarning} /> : ""}
      {showForm ? (
        <SliderForm
          setWarning={setWarning}
          setSelected={setSelected}
          selected={selected}
          showForm={showForm}
          setShowForm={setShowForm}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
        />
      ) : (
        ""
      )}
      <div>
        <Introduction />
        <Upload
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          handleDownload={handleDownload}
          handleExportExcel={handleExportExcel}
        />
      </div>
      <div className="flex flex-row-reverse  mt-2"></div>
      <Guide />
    </div>
  );
}
