import { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { motion} from 'framer-motion';
import { url } from '../assets/admin_assets/assets';
import axios from 'axios';
import { change_token } from '../app/userSlice';
import { useDispatch} from 'react-redux';
function LogInPopUp({setShowLogIn}) {
    const dispatch=useDispatch();
    const [currentState,setCurrentState]=useState("Login");
    const submitHandler=(formData)=>{
        const config={
            method:"post",
            url:"http://localhost:5000/api/",
            data:formData
        };
        if(currentState==="Login"){
            axios.request({...config,url:config.url+"login"}).then(res=>{
                if(res.status===200){
                    dispatch(change_token(res.data.token));
                    setShowLogIn(false);
                }
            })
        }
        else {
            axios.request({...config,url:config.url+"signup"}).then(res=>{
                if(res.status===201){
                    dispatch(change_token(res.data.token));
                    setShowLogIn(false);
                }
            })
        }
    }
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 z-30 flex justify-center items-center px-4'>
        <motion.div initial={{y:"-100vh"}} animate={{y:0}} exit={{y:"-100vh"}} className='bg-white rounded-lg py-8 px-8 w-full sm:w-[400px] z-40'>
            <div className='flex justify-between'>
            <h1 className='text-2xl font-medium'>{currentState}</h1>
            <button onClick={()=>setShowLogIn(false)}>
                <img src={assets.cross_icon} alt="" />
            </button>
            </div>
            <form className='flex flex-col gap-4 w-full my-8' 
            onSubmit={(e)=>{
                e.preventDefault();
                const formData=new FormData(e.target);
                submitHandler(formData);
                e.target.reset();
            }}>
                {
                    currentState==="Sign Up"?<div >
                    <input className='w-full border-[1px] border-gray-300 p-2 text-gray-500 outline-4 outline-orange-500' type="text" placeholder='Your name' id='name' name='name'/>
                </div>:null
                }
                <div >
                    <input className='w-full border-[1px] border-gray-300 p-2 text-gray-500 outline-4 outline-orange-500' type="text" name='email' placeholder='Your email' id='email'/>
                </div>
                <div >
                    <input className='w-full border-[1px] border-gray-300 p-2 text-gray-500 outline-4 outline-orange-500' type="text" name='password' placeholder='Password' id='password'/>
                </div>
                <div>
                    <motion.input whileHover={{scale:1.1}} whileTap={{scale:0.9}} value={currentState==="Login"?"Login":"Sign Up"} type='submit' className='bg-orange-500 text-white px-4 py-2 w-full rounded text-lg font-medium mb-2 cursor-pointer outline-2 outline-orange-200 hover:outline'/>
                    {
                        currentState==="Sign Up"?
                        <div className='flex items-start'>
                        <input type="checkbox" name="terms" id="terms" className='w-4 h-4 mt-1'/>
                        <label htmlFor="terms" className='ms-2 text-md text-gray-500'>By continuing you agree to our terms and conditions</label>
                    </div>:null
                    }
                </div>
            </form>
            <div>
                {
                    currentState==="Login"?
                    <p className='text-gray-500'>Create a new account ? <span className='text-orange-500 font-medium cursor-pointer' onClick={()=>setCurrentState("Sign Up")}>Sign Up</span></p>
                    :
                    <p className='text-gray-500'>Already have an account ? <span className='text-orange-500 font-medium cursor-pointer' onClick={()=>setCurrentState("Login")}>LogIn</span></p>
                }
            </div>
        </motion.div>
    </div>
  )
}

export default LogInPopUp