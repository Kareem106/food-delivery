import React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
function CheckOutPage() {
  const apiUrl=import.meta.env.VITE_API_URL;
  const token=useSelector(state=>state.user.token);
  const cart=useSelector(state=>state.cart);
  const [total,setTotal]=useState(0);

  useEffect(()=>{
      axios.get(`${apiUrl}/food`).then(res=>{
          if(res.status===200){
              const foodList=res.data.data;
              const items=cart.map(item=> ({...foodList.find(x=>x._id===item._id),quantity:item.count}));
              setTotal(items.reduce((total,item)=>{return total+(item.price*item.quantity)},0))
          }
      })
      .catch((err)=>console.log(err))
  },[cart])
  const submiteHandler=(values)=>{
    const config={
      method:"post",
      url:`${apiUrl}/order/checkout`,
      headers:{'Content-Type':'application/json',"Authorization":`Bearer ${token}`},
      data:{
        items:cart,
        address:values.street +', '+ values.city +', ' + values.country
      }
    }
    axios.request(config)
    .then(res=>{
      window.location.assign(res.data.url);
    })
    .catch(err=>console.log(err.message))
  }
  const {handleChange,handleBlur,handleSubmit}=useFormik({
    initialValues:{
      firstName:"",lastName:"",street:"",city:"",state:"",zipCode:"",country:"",phone:""
    },
    onSubmit:submiteHandler,
  }
  );
  if(!token){
    return <Navigate to={"/cart"}/>
  }
  return (
    <div>
      <div className='flex justify-between pt-8'>
        <div className='w-full '>
          <h1 className='text-3xl font-medium text-center mb-12'>Delivery information</h1>
          <form className='flex flex-col gap-8 w-full p-4 px-12 items-center'>
            <div className='flex gap-4 w-full justify-center'>
                <input className='p-4 bg-gray-200 w-full' type="text" name="firstName" id="fname" placeholder='First name'  onChange={handleChange} onBlur={handleBlur} />
                <input className='p-4 bg-gray-200 w-full' type="text" name="lastName" id="lname" placeholder='Last name' onChange={handleChange} onBlur={handleBlur}/>
            </div>
            <div className='flex w-full justify-center'>
                <input className='p-4 bg-gray-200 w-full' type="text" name="street" id="street" placeholder='Street' onChange={handleChange} onBlur={handleBlur}/>
            </div>
            <div className='flex gap-4 w-full justify-center'>
                <input className='p-4 bg-gray-200 w-full' type="text" name="city" id="city" placeholder='City'onChange={handleChange} onBlur={handleBlur} />
                <input className='p-4 bg-gray-200 w-full' type="text" name="state" id="state" placeholder='State' onChange={handleChange} onBlur={handleBlur}/>
            </div>
            <div className='flex gap-4 w-full justify-center'>
                <input className='p-4 bg-gray-200 w-full' type="text" name="zipCode" id="zipcode" placeholder='Zip code' onChange={handleChange} onBlur={handleBlur}/>
                <input className='p-4 bg-gray-200 w-full' type="text" name="country" id="country" placeholder='Country' onChange={handleChange} onBlur={handleBlur}/>
            </div>
            <div className='flex w-full justify-center'>
                <input className='p-4 bg-gray-200 w-full' type="text" name="phone" id="phone" placeholder='Phone' onChange={handleChange} onBlur={handleBlur}/>
            </div>
        </form>
        </div>
        <div className='w-full '>
          <div>
                <h1 className='text-3xl font-medium text-center mb-12'>Cart Totals</h1>
                <div>
                    <div className='flex items-center justify-between text-gray-500 font-medium text-lg border-b-2 border-gray-200 py-2'><span>Subtotal</span><span>${total}</span></div>
                    <div className='flex items-center justify-between text-gray-500 font-medium text-lg border-b-2 border-gray-200 py-2'><span>Deilvery Fee</span><span>$2</span></div>
                    <div className='flex items-center justify-between font-medium text-lg  py-2'><span>Total</span><span>${total+2}</span></div>
                </div>
                <button onClick={handleSubmit} className='w-full md:w-fit bg-orange-500 text-white px-8 py-2 rounded text-md font-medium mt-4 block hover:outline outline-2 outline-orange-200'>PROCESS TO PAYMENT</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutPage