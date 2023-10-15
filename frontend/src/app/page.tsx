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
    console.log(convertToBase64().chip_front64)
    const data = {chip_front : convertToBase64()}
    
    try {
      const response = await fetch('http://127.0.0.1:8000/excel-one', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  function convertToBase64() {
    const chip_front64 =  (imageSrc[0] as string).split(',')[1];
    const chip_back64 =  (imageSrc[1] as string).split(',')[1];

    return {
      chip_front64,
      chip_back64
    };
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
