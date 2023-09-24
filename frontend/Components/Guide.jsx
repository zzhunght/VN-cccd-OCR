import { faCode, faFile, faImage, faRightLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {GuideList} from "../Contants/index"
import React from 'react'
const Guide = () => {
   return (
    <div className='py-5'>
        <h3 className='text-center font-bold text-32 py-5 mb-4'>Hướng dẫn sử dụng</h3>
        <div className='flex-center p-5'>
          <div className='w-1/2 flex-center gap-3 text-[150px] '>
           <FontAwesomeIcon icon={faImage} className='text-[#17CDEA]'/>
           <FontAwesomeIcon icon={faRightLeft} className='text-[#38DC60]'/>
           <FontAwesomeIcon icon={faFile} className='text-[#17CDEA]'/>
          </div>
          <div className='w-1/2'>
            <ul className='list-none'>
                {GuideList.map((item,index)=><li key={index} className='text-20 p-3 gap-5'>
                  <FontAwesomeIcon icon={faCode} className='text-[#17CDEA]'/>
                  <span className='pl-3'>{item}</span>
                  </li>)}
            </ul>
          </div>
        </div>
    </div>
  )
}

export default Guide
