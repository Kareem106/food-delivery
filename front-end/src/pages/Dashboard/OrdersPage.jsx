import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { url } from '../../assets/admin_assets/assets';

function OrdersPage() {
    const token=useSelector(state=>state.user.token);
    const apiUrl=import.meta.env.VITE_API_URL;
    const [orders,setOrders]=useState([]);
    const change_status=(id,status)=>{
        console.log(`${apiUrl}/orders/admin/${id}`)
        const config={
            method:"put",
            url:`${apiUrl}/orders/admin/${id}`,
            data:{status},
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        };
        axios.request(config)
        .then(res=>{
            if(res.status===201){
                console.log(res.data);
                setOrders(prev=>prev.map(order=>order._id===res.data.order._id?res.data.order:order));
            }
        }).catch(err=>console.log(err));
    }
    useEffect(()=>console.log(orders),[orders])
    useEffect(()=>{
        const config={
            method:"get",
            url:`${apiUrl}/orders/admin`,
            headers:{'Content-Type':'application/json',"Authorization":`Bearer ${token}`},
        };
        axios.request(config).then(res=>{
            if(res.status===200)
                setOrders(res.data.orders);
        }).catch(err=>console.log(err));
    },[])
  return (
    <div>
        <table className='w-full text-center border-2'>
            <tr className='*:p-4 border-b-2 border-gray-200 *:text-gray-500 '>
                <th>ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Status</th>
                <th>Total</th>
            </tr>
        {
        orders?.map(order=><Order key={order._id} {...order} change_status={change_status}/>)
        }
        </table>
    </div>
  )
}
const Order=({_id,date,status,items,change_status})=>{
    return(
        <tr className='*:p-4 border-b-2 border-gray-200 font-medium'>
            <td>{_id}</td>
            <td>{(new Date(date)).toLocaleDateString()}</td>
            <td>
            {items.map(items=>(
                    <span className='block' key={items._id}>
                        {items.quantity} x {items.name}
                    </span>
                ))}
            </td>
            <td className='flex items-center justify-center'>
                {/* <div className='flex justify-center items-center p-2 w-fit rounded-lg capitalize'>
                    <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>{status}
                </div> */}
                <div className='flex justify-center items-center p-2 w-fit rounded-lg'>
                <span className={`flex w-3 h-3 me-3 ${status===1?'bg-red-500': status===2?'bg-yellow-500':'bg-green-500'} rounded-full`}></span>
                <select name='status' className='text-lg p-2' value={status} onChange={e=>change_status(_id,e.target.value)}>
                    <option value={1} >Food Processing</option>
                    <option value={2} >Out For Delivery</option>
                    <option value={3} >Delivered</option>
                </select>
                </div>
            </td>
            <td className='font-medium text-lg'>
                ${
                    items.reduce((total,item)=>{return total+(item.price*item.quantity)},0)
                }
            </td>
        </tr>
    )
}
export default OrdersPage