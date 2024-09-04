import React from 'react'
import { useNavigate, useParams,useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
function VerifyPage() {
    const apiUrl=import.meta.env.VITE_API_URL;
    const token=useSelector(state=>state.user.token);
    const {id}=useParams();
    const [searchParams,setSearchParams]=useSearchParams();
    const navigate=useNavigate();
    useEffect(()=>{
        const config={
            method:"get",
            url:`${apiUrl}/orders/${id}/verify?success=${searchParams.get("success")}`,
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        };
        axios.request(config)
        .then(res=>{
            if(res.status===200){
                toast.success(res.data.message);
            }
        })
        .catch(err=>{
            console.log(err);
            toast.error(err.response.data.message);
        })
        .finally(()=>setTimeout(()=>navigate("/"),2000));
    },[])
  return (
    <div className='flex justify-center items-center py-20'>
        <div className='w-16'>
            <Spinner/>
        </div>
    </div>
  )
}

export default VerifyPage