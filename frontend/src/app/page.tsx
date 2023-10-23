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

  function convertToBase64() {
    const chip_front64 = (imageSrc[0] as string).split(",")[1];
    const chip_back64 = (imageSrc[1] as string).split(",")[1];

    return {
      chip_front64,
      chip_back64,
    };
  }

  const handleExportExcel = async (e: React.MouseEvent) => {
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

    const data = {
      chip_front: convertToBase64().chip_front64,
      chip_back: convertToBase64().chip_back64,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/excel-one", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const responseData = await response.json();
      // console.log('Success:', responseData);
      const blobData = await response.blob();
      const url = URL.createObjectURL(blobData);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "TrichXuatThongTin.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
      console.log("File tải về thành công");

      setSelected(-1);
      setImageSrc([]);
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
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
