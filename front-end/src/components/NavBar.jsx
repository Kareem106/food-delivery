import React, { useState } from 'react'
import {assets} from "../assets/frontend_assets/assets"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { log_out } from '../app/userSlice';
function NavBar({setShowLogIn,setSideBarCollapse}) {
    const {token,role}=useSelector(state=>state.user); 
    const dispatch=useDispatch();

    const [collapse,setCollapse]=useState(true);
    const cartItems=useSelector(state=>state.cart);
  return (
    <div className='w-full fixed z-40 top-0 left-0 '>
        <div className='flex items-center justify-between py-4 lg:container m-auto bg-white px-4 lg:px-0'>
            <div>
            <Link to={"/"}><img src={assets.logo} alt="logo" /></Link>
            </div>
            <ul className='hidden md:flex gap-4 text-lg items-center'>
                <li>
                    <a href={"#home"}>Home</a>
                </li>
                <li>
                    <a href={"#menu"}>Menu</a>
                </li>
                <li>
                    <a href={"/"}>Mobile-App</a>
                </li>
            </ul>
            <div className='flex items-center gap-4 md:gap-8 relative'>
                {/* <img src={assets.search_icon} alt="basket" /> */}
                <Link to="/cart" className='relative'><img src={assets.basket_icon} alt="basket" />
                {cartItems.length>0?<span className='absolute w-3 h-3 bg-orange-500 rounded-full -top-3 -right-3'></span>:null}</Link>
                {
                    !token?
                    <button className='hidden md:block border-2 border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-150'
                    onClick={()=>setShowLogIn(true)}>Sign In</button>
                    :
                    <button className='hidden md:block' onClick={()=>setCollapse(state=>!state)}>
                        <img src={assets.profile_icon} alt="" />
                    </button>
                }
                <button onClick={()=>setSideBarCollapse(state=>!state)} className='md:hidden w-fit'>
                    <img className='h-[34px]  aspect-square' src="/menu.png" alt="" />
                </button>
                <ul className={`${collapse?"hidden":"flex"} flex-col w-[200px] gap-4 text-lg bg-gray-700 text-white p-4 rounded-lg absolute right-2 top-24 z-40`}>
                {
                    token && role==="admin"?
                    <li>
                        <Link to={"/dashboard"} className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg block w-full'>Dashboard</Link>
                    </li>:null
                }
                <li>
                    <button onClick={()=>{
                        dispatch(log_out());
                        setCollapse(true);
                    }} className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 ps-0 rounded-lg w-full flex items-center gap-2'>
                        <img src={assets.logout_icon} alt=""/> <span>Log Out</span>
                    </button>
                </li>
            </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar