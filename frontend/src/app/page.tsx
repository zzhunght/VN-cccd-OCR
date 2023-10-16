"use client";
import { useState, useRef } from "react";
import Introduction from "../../Components/Introduction";
import Upload from "../../Components/Upload";
import SliderForm from "../../Components/SliderForm";
import Guide from "../../Components/Guide";
import Warning from "./../../Components/Warning";
export default function Home() {
  const [message, setMessage] = useState("");
  const [imageSrc, setImageSrc] = useState([""]);
  const [selected, setSelected] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [warning, setWarning] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const minClickInterval = 4000;
  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowForm(true);
  };
  const handleExportExcel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (imageSrc.length !== 2) {
      const currentTime = Date.now();
      if (currentTime - lastClickTime >= minClickInterval) {
        setWarning(true);
        setMessage("Bạn chưa cung cấp đủ 2 ảnh cho chúng tôi");
        setTimeout(() => {
          setWarning(false);
        }, 4000); // lát tao làm warning sau
        setLastClickTime(currentTime);
      }
    }
    console.log(imageSrc); //data là 2 file ảnh lưu trong biến imageSrc
    //xử lí ở đây
    setImageSrc([]); // xong rồi reset lại
  };
  return (
    <div className="content">
      {warning ? <Warning setWarning={setWarning} message={message} /> : ""}
      {showForm ? (
        <SliderForm
          setMessage={setMessage}
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
