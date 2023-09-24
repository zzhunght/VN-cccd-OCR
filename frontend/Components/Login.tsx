import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React ,{useEffect,useState} from 'react'
interface LoginProps {
    showModalRegister:boolean,
    showModalLogin : boolean,
    setShowModalRegister : (b:boolean)=> void,
    setShowModalLogin : (b:boolean) => void
}
const Login = ({showModalLogin,setShowModalLogin,showModalRegister,setShowModalRegister}:LoginProps) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoginFormVisible(true);
      }, 0);
      return () => clearTimeout(timer);
  }, []);
  const Infomation = [
    {
      name:"Email",
      type :"email"
    },
    {
      name:"Password",
      type:"password"
    }
  ]
  return (
    <div className={`form-login fixed z-20 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white 
    rounded-md overflow-hidden shadow-3 cursor-pointer ${isLoginFormVisible ? ("top-1/2 mt-0 opacity-100"):("top-1/3 -mt-5 opacity-50")} `}>
      <div>
        <FontAwesomeIcon icon={faDeleteLeft} className='float-right text-32 text-bb' onClick={(e)=>setShowModalLogin(false)}/>
      </div>
      <form className='pt-8 pb-3 px-5'>
        <h1 className='text-24 font-semibold p-3'>Đăng nhập tài khoản của bạn</h1>
        {Infomation.map((item,index)=><div key={index} className='px-2'>
            <p className='py-3'>{item.name}</p>
            <input type={item.type} placeholder={`Nhập vào ${item.name} của bạn`} className='p-2 w-full rounded-md outline-none
            border-b-slate-300 border-b-[1px] border-solid hover:border-b-black'></input>
        </div>)}
      </form>
      <div className='flex-2center gap-3 py-3'>
        <p>Bạn chưa có tài khoản ?</p>
        <button className='text-bb underline' onClick={(e)=>{setShowModalRegister(true)
        setShowModalLogin(false)}}>Đăng ký</button>
      </div>
      <div className='mt-3'>
        <button className='w-full bg-gw p-3 text-white'>Đăng nhập</button>
      </div>
    </div>
  )
}

export default Login
