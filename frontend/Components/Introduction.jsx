import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Advantage } from "../Contants";
const Introduction = () => {
  return (
    <div className="basis-1/3">
      <div>
        <h1 className="font-bold text-32 leading-32 my-10 text-center">
          <spa className="text-[#17CDEA]">2Fast - </spa>
          Công cụ trích xuất chứng minh nhân dân
        </h1>
        {/* <ul className='list-none'>
          {Advantage.map((title,index)=>(          
          <li className='flex-center text-24 leading-24 py-3 pl-1 gap-3 ' key={index}>
            <FontAwesomeIcon icon={faCheck} className=' text-g '/>
            <span className='text-bb font-medium'>{title}</span>         
          </li>
          ))}
        </ul>
        <p className='text-20 mt-2 p-1 leading-20'>Giúp bạn đơn giản hóa việc trích xuất</p> */}
      </div>
    </div>
  );
};

export default Introduction;
