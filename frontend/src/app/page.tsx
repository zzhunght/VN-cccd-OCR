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
  const [excelFile, setExcelFile] = useState("");
  const [selected, setSelected] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [warning, setWarning] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const minClickInterval = 4000;
  const setNotification = (status: string, message: string) => {
    setWarning(true);
    setMessage(message);
    setStatus(status);
    setTimeout(() => {
      setWarning(false);
    }, 4000);
  };
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
        setNotification("Warning", "Bạn chưa cung cấp đủ 2 ảnh cho chúng tôi");
        setLastClickTime(currentTime);
      }
    } else {
      setLoading(true); //tạo loading
      if (excelFile) {
        // neu co file excel co san thi lam nhu the nay
        console.log("YES================================================");
        const data = {
          chip_front: convertToBase64().chip_front64,
          chip_back: convertToBase64().chip_back64,
          excel_file: excelFile.toString(),
        };
        console.log(data);
        console.log(excelFile);
        console.log(excelFile.toString());
        try {
          const response = await fetch("http://127.0.0.1:8000/excel-existing", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.detail);
          } else {
            const blobData = await response.blob();
            const url = URL.createObjectURL(blobData);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "TrichXuatThongTinCoSan.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);
            console.log("File tải về thành công");
            setNotification("Success", "Thành công");
            setImageSrc([]);
            setLoading(false); //tắt loading
          }
        } catch (error: any) {
          console.log("Error:", error);
          setNotification("Error", error.message);
          setLoading(false);
        }
        //=ágdhjkasgdhjasgdjhasgdhjasgdh  gáhjdgashjdgasjhd =================================================================
      } else {
        //================================================================
        console.log(
          "No================================================================"
        );
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
            const error = await response.json()
            throw new Error(error?.detail);
          } else {
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
            setNotification("Success", "Thành công");
            setImageSrc([]);
            setLoading(false); //tắt loading
          }
        } catch (error: any) {
          console.error("Error:", error);
          setNotification("Error", error.message);
          setLoading(false);
        }
        //============================================================================ no
      }
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
            excelFile={excelFile}
            setExcelFile={setExcelFile}
          />
        )}
      </div>
      <div className="flex flex-row-reverse  mt-2"></div>
      <Guide />
    </div>
  );
}
