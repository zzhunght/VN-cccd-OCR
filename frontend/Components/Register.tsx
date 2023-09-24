import React ,{useEffect,useState} from 'react'
import { faDeleteLeft, faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface RegisterProps {
    showModalRegister:boolean,
    showModalLogin : boolean,
    setShowModalRegister : (b:boolean)=> void,
    setShowModalLogin : (b:boolean) => void
}
const Register = ({showModalRegister,setShowModalRegister,showModalLogin,setShowModalLogin}:RegisterProps) => {
    const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
    useEffect(() => {
          const timer = setTimeout(() => {
            setIsRegisterFormVisible(true)
          }, 0);
          return () => clearTimeout(timer);
      }, []);
    const Infomation = [
        {
            name:"Tên đăng nhập của bạn",
            type:"text"
        },
        {
          name:"Email",
          type :"email"
        },
        {
          name:"Password",
          type:"password"
        },
        {
          name:"Nhập lại Password",
          type :"password"
        },
        {
          name:"Số điện thoại",
          type:"tel"
        }
      ]
  return (
    <div className={`form-register fixed z-20 -translate-x-1/2 -translate-y-1/2  bg-white 
    rounded-md overflow-hidden shadow-3 cursor-pointer top-1/2 ${isRegisterFormVisible ?("left-1/2 opacity-100"):
    ("left-1/4 opacity-50")}`}>
      <div>
        <FontAwesomeIcon icon={faLeftLong} className='text-32 float-left pl-2' onClick={(e)=>
        {setShowModalLogin(true) 
        setShowModalRegister(false)}}/>
        <FontAwesomeIcon icon={faDeleteLeft} className='float-right text-32 text-bb' onClick={(e)=>setShowModalRegister(false)}/>
      </div>
      <form className='pt-8 pb-3 pr-10 pl-3'>
        <h1 className='text-24 font-semibold p-3'>Đăng Ký tài khoản của bạn</h1>
        {Infomation.map((item,index)=><div key={index} className='px-2'>
            <p className='py-3'>{item.name}</p>
            <input type={item.type} placeholder={index===3 ?('Nhập lại Password của bạn'):(`Nhập vào ${item.name} của bạn`)} className='p-2 w-full rounded-md outline-none
            border-b-slate-300 border-b-[1px] border-solid hover:border-b-black'></input>
        </div>)}
      </form>
      <div className='mt-4'>
        <button className='w-full bg-gw p-3 text-white'>Đăng ký</button>
      </div>
    </div>
  )
}

export default Register
