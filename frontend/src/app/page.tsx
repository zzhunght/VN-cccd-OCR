"use client"
import { useState } from 'react';
import Introduction from '../../Components/Introduction'
import Upload from '../../Components/Upload'
import SliderForm from '../../Components/SliderForm';
import Guide from '../../Components/Guide';
export default function Home() {
  const [imageSrc, setImageSrc] = useState([]);
  const [selected,setSelected]=useState(-1)
  const handleDownload = async (e:MouseEvent) =>{
    console.log(selected) //lấy chỉ mục slider
    console.log(imageSrc) //ảnh cccd //xử lí khi bấm tải về biểu mẫu thông tin
    setSelected(-1) //xong rồi thì reset
    setImageSrc([])
  }
  const handleExportExcel = async (e:MouseEvent) =>{
    console.log(1234) //xử lí khi bấm nút xuất excel
  }
  return (
    <div className='content'>
      <div className=' flex-center justify-between  '>
        <Introduction/>
        <Upload imageSrc={imageSrc} setImageSrc={setImageSrc}/>
      </div>
      <div className='flex flex-row-reverse  mt-2'>      
        <SliderForm handleDownload={handleDownload} handleExportExcel={handleExportExcel} setSelected={setSelected} selected={selected}/>
      </div>
      <Guide/>
    </div>
  )
}
