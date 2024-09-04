import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { assets } from '../assets/frontend_assets/assets';
import { Navigate } from 'react-router-dom';
function UserOrders() {
    const api=import.meta.env.VITE_API_URL;
    const [orders,setOrders]=useState([]);
    const token=useSelector(state=>state.user.token);
    useEffect(()=>{
        const config={
            method:"get",
            url:`${api}/orders`,
            headers:{'Content-Type':'application/json',"Authorization":`Bearer ${token}`},
        };
        axios.request(config)
        .then(res=>{
          if(res.status===200)
            setOrders(res.data.orders);
        })
        .catch(err=>console.log(err));
    },[])
    if(!token)
      return <Navigate to={'/'}/>
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-12'>
      {
        orders?.map(order=><OrderCard key={order._id} {...order}/>)
      }
    </div>
  )
}
const OrderCard=({items,status,date,address})=>{
  return(
    <div className='bg-gray-100 rounded-lg overflow-hidden'>
      <div className='bg-gray-200 p-4 flex gap-4'>
        <div className="flex flex-col gap-2 text-lg">
          <span className='text-gray-500'>Date</span>
          <p className='text-lg font-medium'>{(new Date(date)).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <span className='text-gray-500'>Deliver to</span>
          <p className='text-lg font-medium'>{address}</p>
        </div>
      </div>
        {
          items?.map(item=>(
          <div key={item._id}>
                <div  className='flex justify-between item-center p-4'>
                <div className='flex gap-4 items-center'>
                  <img src={item.image.url} alt=""  className='w-20'/>
                  <div>
                    <h1 className='text-lg font-medium'>{item.name}</h1>
                    <p className='text-gray-500'>{item.category}</p>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <h1 className='text-lg font-medium'>${item.price}</h1>
                  <p className='text-gray-500'>Qty : {item.quantity}</p>
                </div>
              </div>
          </div>))
        }
        <hr />
        <div>
            <p className='text-lg font-medium p-4'>
              <span className={`inline-block w-3 h-3 me-3 ${status===1?'bg-red-500': status===2?'bg-yellow-500':'bg-green-500'} rounded-full animate-pulse`}></span> {status===1?'Food Processing': status===2?'Out For Delivery':'Delivered'}</p>
        </div>
    </div>
  )
}
export default UserOrders