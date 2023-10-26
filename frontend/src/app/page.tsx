"use client";
import { useState, useRef } from "react";
import Introduction from "../../Components/Introduction";
import Upload from "../../Components/Upload";
import SliderForm from "../../Components/SliderForm";
import Guide from "../../Components/Guide";
import Notification from "../../Components/Notification";
import Loading from "../../Components/Loading";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [imageSrc, setImageSrc] = useState([""]);
  const [selected, setSelected] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [warning, setWarning] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const minClickInterval = 4000;
  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowForm(true); //hiển thị form chọn các biểu mẫu như sơ yếu ,....
  };

  function convertToBase64() {
    const chip_front64 = (imageSrc[0] as string).split(",")[1];
    const chip_back64 = (imageSrc[1] as string).split(",")[1];

    return {
      chip_front64,
      chip_back64,
    };
  }

  const handleExportExcel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //xuất excel
    if (imageSrc.length !== 2) {
      //kiểm tra xem đã đủ 2 ảnh chưa
      const currentTime = Date.now();
      if (currentTime - lastClickTime >= minClickInterval) {
        // set để warning hiển thị cách nhau mỗi 4 giây
        setWarning(true);
        setMessage("Bạn chưa cung cấp đủ 2 ảnh cho chúng tôi");
        setStatus("Warning");
        setTimeout(() => {
          setWarning(false);
        }, 4000);
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
      {warning ? (
        <Notification
          setWarning={setWarning}
          message={message}
          status={status}
        />
      ) : (
        ""
      )}
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
          setStatus={setStatus}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        ""
      )}
      <div>
        <Introduction />
        {loading ? (
          <Loading />
        ) : (
          <Upload
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            handleDownload={handleDownload}
            handleExportExcel={handleExportExcel}
          />
        )}
      </div>
      <div className="flex flex-row-reverse  mt-2"></div>
      <Guide />
    </div>
  );
}
