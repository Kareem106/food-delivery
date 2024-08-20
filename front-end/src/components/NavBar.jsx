import React, { useState } from 'react'
import {assets} from "../assets/frontend_assets/assets"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function NavBar({setShowLogIn}) {
    const token=useSelector(state=>state.user.token);
    const [collapse,setCollapse]=useState(true);
    const cartItems=useSelector(state=>state.cart);
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between py-6'>
            <div>
            <img src={assets.logo} alt="logo" />
            </div>
            <ul className='hidden md:flex gap-4 text-lg items-center'>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/"}>Menu</Link>
                </li>
                <li>
                    <Link to={"/"}>Mobile-App</Link>
                </li>
            </ul>
            <div className='flex items-center gap-8 relative'>
                <img src={assets.search_icon} alt="basket" />
                <Link to="/cart" className='relative'><img src={assets.basket_icon} alt="basket" />
                {cartItems.length>0?<span className='absolute w-3 h-3 bg-orange-500 rounded-full -top-3 -right-3'></span>:null}</Link>
                {
                    !token?
                    <button className='border-2 border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-150'
                    onClick={()=>setShowLogIn(true)}>Sign In</button>
                    :
                    <button>
                        <img src={assets.profile_icon} alt="" />
                    </button>
                }
                <button onClick={()=>setCollapse(!collapse)} className='md:hidden'>
                    <img className='w-3/4' src="/menu.png" alt="" />
                </button>
                <ul className={`${collapse?"hidden":"flex"} flex-col md:hidden gap-4 text-lg bg-orange-500 text-white p-4 rounded-lg absolute right-2 top-24 z-40`}>
                <li className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg w-full'>
                    <Link to={"/"}>Home</Link>
                </li>
                <li className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg w-full'>
                    <Link to={"/"}>Menu</Link>
                </li>
                <li className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg w-full'>
                    <Link to={"/"}>Mobile-App</Link>
                </li>
            </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar