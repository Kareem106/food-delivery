import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assets } from '../assets/frontend_assets/assets';
import axios from 'axios';
import { AnimatePresence,motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeFromCart } from '../app/cartSlice';
function CartPage() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const token=useSelector(state=>state.user.token);
    const apiUrl=import.meta.env.VITE_API_URL;
    const variants={
        hidden:{x:"-50vw",opacity:0},
        visible:i=>(
            {
                x:0,
                opacity:1,
                transition:{
                    delay: i * 0.03,
                    duration:0.3
                }
            }
        )
    }
    const cart=useSelector(state=>state.cart);
    const [cartItems,setCartItems]=useState([]);
    const [total,setTotal]=useState(0);
    useEffect(()=>{
        if(cart.length>0){
            axios.get(`${apiUrl}/food`).then(res=>{
                if(res.status===200){
                    const foodList=res.data.data;
                    const items=cart.map(item=> ({...foodList.find(x=>x._id===item._id),quantity:item.count}));
                    setTotal(items.reduce((total,item)=>{return total+(item.price*item.quantity)},0))
                    setCartItems(items);
                }
            })
            .catch((err)=>console.log(err))
        }
    },[cart])
  return (
    <div className='py-8'>
        {cart.length>0?
        <div>
                    <div>
            <table className='w-full text-center mb-12 overflow-hidden'>
                <tr className='*:p-4 border-b-2 border-gray-200 text-gray-500'>    
                    <th className='p-4'>Item</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
                <AnimatePresence>
                    {cartItems?.map((item,i)=>(
                        <motion.tr variants={variants} initial="hidden" animate="visible" custom={i} exit={{x:"50vw",opacity:0}} transition={{duration:0.5}} key={item._id} className='*:p-4 border-b-2 border-gray-200 font-medium'>
                            <td><img src={item?.image?.url} alt="" className='w-20 block m-auto' /></td>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.quantity*item.price}</td>
                            <td><img src={assets.remove_icon_red} alt="" className='w-8 block m-auto cursor-pointer' onClick={()=>dispatch(removeFromCart(item._id))}/></td>
                        </motion.tr>))}
                </AnimatePresence>
            </table>
        </div>
        <div className='flex justify-between w-full flex-col md:flex-row *:w-full md:*:max-w-[600px] gap-12'>
            <div className=''>
                <h1 className='text-3xl font-bold mb-8'>Cart Totals</h1>
                <div>
                    <div className='flex items-center justify-between text-gray-500 font-medium text-lg border-b-2 border-gray-200 py-2'><span>Subtotal</span><span>${total}</span></div>
                    <div className='flex items-center justify-between text-gray-500 font-medium text-lg border-b-2 border-gray-200 py-2'><span>Deilvery Fee</span><span>$2</span></div>
                    <div className='flex items-center justify-between font-medium text-lg  py-2'><span>Total</span><span>${total+2}</span></div>
                </div>
                <button onClick={()=>{
                    if(token)
                    navigate('/checkout')
                    else
                    toast.warning("Please login to checkout");
                }} className='w-full md:w-fit bg-orange-500 text-white px-8 py-2 rounded text-md font-medium mt-4 block hover:outline outline-2 outline-orange-200'>PROCEED TO CHECKOUT</button>
            </div>
            <div className=''>
                <h1 className='text-gray-500 mb-4 text-lg'>If you have promo code, Enter it here</h1>
                <div className='flex'>
                    <input type="text" className='bg-gray-200 p-4 rounded-md flex-1 outline-2 outline-gray-300' placeholder='Promo code'/>
                    <button className='bg-black text-white px-12 py-4 rounded-md outline-2 outline-gray-300 hover:outline'>Submit</button>
                </div>
            </div>
        </div>
        </div>:
            <div className='flex flex-col gap-12 justify-center items-center py-12'>
                <h1 className='text-4xl font-bold text-gray-400'>Your cart is empty</h1>
                <img src={assets.empty_cart} alt="" className='max-w-[300px] md:max-w-[400px]'/>
            </div>}
    </div>
  )
}

export default CartPage