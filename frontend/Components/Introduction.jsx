import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Advantage } from '../Contants'
const Introduction = () => {
  return (
    <div className='basis-1/2'>
      <div>
        <h2 className='font-bold text-32 py-4'>Công cụ trích xuất chứng minh nhân dân</h2>
        <ul className='list-none'>
          {Advantage.map((title,index)=>(          
          <li className='flex-center text-24 py-3 pl-1 gap-3 ' key={index}>
            <FontAwesomeIcon icon={faCheck} className=' text-g '/>
            <span className='text-bb font-medium'>{title}</span>         
          </li>
          ))}
        </ul>
        <p className='text-20 mt-2 p-1'>Giúp bạn đơn giản hóa việc trích xuất</p>
      </div>
    </div>
  )
}

export default Introduction
