import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
  return (
    <div className='p-5 content mt-5 border-t-[3px] border-solid'>
      <h1 className='font-bold text-24'>Liên hệ với chúng tôi</h1>
      <p>
        <FontAwesomeIcon icon={faEnvelope} className='mr-2 text-oy'/>
        Email : <span>lieuminhkha@gmail.com</span>
      </p>
      <p>
        <FontAwesomeIcon icon={faPhone} className='mr-2 text-gw'/>
        Số điện thoại :<span> 0914939121</span>
      </p>
    </div>
  )
}

export default Footer
