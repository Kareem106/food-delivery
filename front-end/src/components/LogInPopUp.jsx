import { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { motion} from 'framer-motion';
import { url } from '../assets/admin_assets/assets';
import axios from 'axios';
import { change_token } from '../app/userSlice';
import { useDispatch} from 'react-redux';
import { useFormik } from 'formik';
import { logInSchema,signUpSchema } from '../schemas/index';
import { toast } from 'react-toastify';
function LogInPopUp({setShowLogIn}) {
    const apiUrl=import.meta.env.VITE_API_URL;
    const dispatch=useDispatch();
    const [currentState,setCurrentState]=useState("Login");
    const submitHandler=(values)=>{
        console.log(values);
        const config={
            method:"post",
            url:apiUrl,
            data:values
        };
        if(currentState==="Login"){
            axios.request({...config,url:config.url+"/login"}).then(res=>{
                if(res.status===200){
                    toast.success(res.data.message);
                    dispatch(change_token({token:res.data.token,role:res.data.user.role}));
                    setShowLogIn(false);
                }
            }).catch(err=>{
                console.log(err);
                if(err.response.data.error)
                    toast.error(err.response.data.error);
                Object.keys(err.response.data.errors).map(error=>{
                    toast.error(err.response.data.errors[error]);
                })
            });
        }
        else {
            axios.request({...config,url:config.url+"/signup"}).then(res=>{
                if(res.status===201){
                    toast.success(res.data.message);
                    dispatch(change_token({token:res.data.token,role:res.data.user.role}));
                    setShowLogIn(false);
                }
            }).catch(err=>{
                console.log(err);
                if(err.response.data.error)
                    toast.error(err.response.data.error);
                Object.keys(err.response.data.errors).map(error=>{
                    toast.error(err.response.data.errors[error]);
                })
            });
        }
    }
    const {handleBlur,handleChange,handleSubmit,touched,values,errors,isSubmitting}=useFormik({
        initialValues:{
            name:"",email:"",password:"",terms:false
        },
        validationSchema: currentState==="Login"?logInSchema:signUpSchema,
        onSubmit:(values,actions)=>{
            if(currentState==="Login"){
                submitHandler({email:values.email,password:values.password});
        }else{
            submitHandler({name:values.name,email:values.email,password:values.password});
        }
        actions.resetForm();
    }});
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 z-50 flex justify-center items-center px-4'>
        <motion.div initial={{y:"-100vh"}} animate={{y:0}} exit={{y:"-100vh"}} className='bg-white rounded-lg py-8 px-8 w-full sm:w-[400px] z-40'>
            <div className='flex justify-between'>
            <h1 className='text-2xl font-medium'>{currentState}</h1>
            <button onClick={()=>setShowLogIn(false)}>
                <img className='w-[32px]' src={assets.close_icon} alt="" />
            </button>
            </div>
            <form className='flex flex-col gap-4 w-full my-8' 
            onSubmit={handleSubmit}
            >
                {
                    currentState==="Sign Up"?<div >
                    <input className='w-full border-[1px] border-gray-300 p-2 text-gray-500 outline-4 outline-orange-500' type="text" placeholder='Your name' id='name' name='name'
                    value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                    {errors.name && touched.name?<p className='text-red-500'>{errors.name}</p>:null}
                </div>:null
                }
                <div >
                    <input className='w-full border-[1px] border-gray-300 p-2 text-gray-500 outline-4 outline-orange-500' type="text" name='email' placeholder='Your email' id='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                    {errors.email && touched.email?<p className='text-red-500'>{errors.email}</p>:null}
                </div>
                <div >
                    <input className='w-full border-[1px] border-gray-300 p-2 text-gray-500 outline-4 outline-orange-500' type="text" name='password' placeholder='Password' id='password' value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                    {errors.password && touched.password?<p className='text-red-500'>{errors.password}</p>:null}
                </div>
                <div>
                    <input value={currentState==="Login"?"Login":"Sign Up"} type='submit' className={`bg-orange-500 text-white px-4 py-2 w-full rounded text-lg font-medium mb-2 cursor-pointer outline-2 outline-orange-200 hover:outline ${(errors.name||errors.email || errors.password || isSubmitting)?'opacity-50':''}`} disabled={(errors.name||errors.email || errors.password || isSubmitting)}/>
                    {
                        currentState==="Sign Up"?
                        <div>
                            <div className='flex items-start'>
                                <input type="checkbox" name="terms" id="terms" className='w-4 h-4 mt-1' checked={values.terms}
                                onChange={handleChange} onBlur={handleBlur}/>
                                <label htmlFor="terms" className='ms-2 text-md text-gray-500'>By continuing you agree to our terms and conditions</label>
                            </div>
                            {errors.terms && touched.terms?<p className='text-red-500'>{errors.terms}</p>:null}
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