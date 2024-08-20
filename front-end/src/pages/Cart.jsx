import React, { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import { assets } from '../assets/frontend_assets/assets';
import axios from 'axios';
function Cart() {
    const cart=useSelector(state=>state.cart);
    const [cartItems,setCartItems]=useState([]);
    const [total,setTotal]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:5000/api/food").then(res=>{
            if(res.status===200){
                const foodList=res.data.data;
                const items=cart.map(item=> ({...foodList.find(x=>x._id===item._id),quantity:item.count}));
                setTotal(items.reduce((total,item)=>{return total+(item.price*item.quantity)},0))
                setCartItems(items);
            }
        })
        .catch((err)=>console.log(err))
    },[cart])
  return (
    <div className='py-8'>
        <div>
            <table className='w-full text-center mb-12'>
                <tr className='*:p-4 border-b-2 border-gray-200 text-gray-500'>    
                    <th className='p-4'>Item</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
                    {cartItems?.map(item=>(
                        <tr key={item._id} className='*:p-4 border-b-2 border-gray-200 font-medium'>
                            <td><img src={item?.image?.url} alt="" className='w-20 block m-auto' /></td>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.quantity*item.price}</td>
                            <td><img src={assets.remove_icon_red} alt="" className='w-8 block m-auto cursor-pointer'/></td>
                        </tr>))}
            </table>
        </div>
        <div className='flex justify-between w-full flex-col md:flex-row *:w-full md:*:max-w-[600px] gap-12'>
            <div className=''>
                <h1 className='text-3xl font-bold mb-8'>Cart Totals</h1>
                <div>
                    <div className='flex items-center justify-between text-gray-500 font-medium text-lg border-b-2 border-gray-200 py-2'><span>Subtotal</span><span>{total}</span></div>
                    <div className='flex items-center justify-between text-gray-500 font-medium text-lg border-b-2 border-gray-200 py-2'><span>Deilvery Fee</span><span>2</span></div>
                    <div className='flex items-center justify-between font-medium text-lg  py-2'><span>Total</span><span>{total+2}</span></div>
                </div>
                <button className='w-full md:w-fit bg-orange-500 text-white px-8 py-2 rounded text-md font-medium mt-4 hover:outline outline-2 outline-orange-200'>PROCEED TO CHECKOUT</button>
            </div>
            <div className=''>
                <h1 className='text-gray-500 mb-4 text-lg'>If you have promo code, Enter it here</h1>
                <div className='flex'>
                    <input type="text" className='bg-gray-200 p-4 rounded-md flex-1 outline-2 outline-gray-300' placeholder='Promo code'/>
                    <button className='bg-black text-white px-12 py-4 rounded-md outline-2 outline-gray-300 hover:outline'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart