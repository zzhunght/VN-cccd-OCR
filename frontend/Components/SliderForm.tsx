"use client"
import React , {useState} from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
interface FunctionProps {
  handleDownload: (e: any) => void; // giờ để tạm any để không lỗi mốt tao fix lại sao
  handleExportExcel: (e: any) => void;
  setSelected : (n:number) => void;
  selected : number
}
interface CustomSlideButtonProps {
  onClick: () => void;
}
const SliderForm = ({handleDownload,handleExportExcel,setSelected,selected}:FunctionProps) => {
 //slide nào được chọn thì 2light
  const handleSelected = async (e:Event,index:number)=>{
    if(selected === index){
      setSelected(-1)
    }
    else{
      setSelected(index)
    }
  }
  const CustomPrevButton = ({ onClick }:CustomSlideButtonProps) => ( //custom lại 2 cái nút chuyển slide
    <button className="arrow-slider-custom-l
    " onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft}/>
    </button>
  ); 
  const CustomNextButton = ({onClick}:CustomSlideButtonProps) => (
    <button className="arrow-slider-custom-r" onClick={onClick}>
     <FontAwesomeIcon icon={faArrowRight}/>
    </button>
  );
  const items = [
    { content: 'Slide 1' }, //fake đại data
    { content: 'Slide 2' },
    { content: 'Slide 3' },
    { content: 'Slide 4' },
    { content: 'Slide 5' },
    { content: 'Slide 6' },
    { content: 'Slide 6' },
    { content: 'Slide 6' },
    { content: 'Slide 9' },
  ];
  const settings = {  
    dots:true,  //setting slider
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true, 
    arrow:true,
    initialSlide:0,
    speed:200,
    infinite:true,
    rows:1,
    autoplay:true,
    autoplaySpeed:3000,
    pauseOnHover:true,
    useCSS:true,
    prevArrow:<CustomPrevButton onClick={function (): void {
      throw new Error('Function not implemented.');
    } }/>,
    nextArrow:<CustomNextButton onClick={function (): void {
      throw new Error('Function not implemented.');
    } }/>
  };
    return (
        <div className='w-2/3 p-2' >
          <div>
            <Slider {...settings} >
              {items.map((item,index)=>
              <div className={`text-center font-semibold text-16 border-2-solid-blue500 p-2 rounded-md
              ${selected === index ? "slideselected":''}`} key={index}
              onClick={(e:any)=>handleSelected(e,index)}>
                 <h4>{item.content}</h4>
              </div>
              )}
            </Slider> 
          </div> 
          <div className='mt-10 flex-2center  gap-5 text-white'>
            <button onClick={handleExportExcel} className='bg-g py-2 px-3 rounded-md'>Xuất excel</button>
            <button onClick={handleDownload}className='bg-oy py-2 px-3 rounded-md'>Tải về biểu mẫu thông tin</button>
          </div>
        </div> 
  )
}

export default SliderForm