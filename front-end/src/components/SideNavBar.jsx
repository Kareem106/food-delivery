import React from 'react'
import { Link } from 'react-router-dom'
import { motion} from 'framer-motion'
import { assets } from '../assets/frontend_assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { log_out } from '../app/userSlice'
import { AnimatePresence } from 'framer-motion'
function SideNavBar({setSideBarCollapse,setShowLogIn}) {
    const user=useSelector(state=>state.user);
    const dispatch=useDispatch();
  return (
    <div className='fixed md:hidden top-0 right-0 w-full bg-black/50 h-screen z-50 flex justify-end' onClick={()=>setSideBarCollapse(true)}>
            <motion.div initial={{width:0}} animate={{width:"70%"}} exit={{width:0}}  className='h-full bg-white flex flex-col w-full justify-between'>
                <div className='p-4' >
                    <ul className="flex-col gap-4 text-lg text-black  rounded-lg mb-8">
                        <a href='/#home'>
                            <li className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg w-full'>
                                Home
                            </li>
                        </a>
                        <a href={'/#menu'}>
                            <li className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg w-full'>
                                Menu
                            </li>
                        </a>
                        <a href={'/#app'}>
                            <li className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg w-full'>
                                Mobile-App
                            </li>
                        </a>
                        {
                            user?.token?
                            <Link to={"/orders"}>
                                <li className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg w-full'>
                                orders
                            </li>
                            </Link>:
                            null
                        }
                        {
                            user.role==="admin"?
                            <Link to={"/dashboard"}>
                                <li className='cursor-pointer hover:text-orange-500 hover:bg-white p-4 rounded-lg w-full'>
                                Dashboard
                            </li>
                            </Link>:
                            null
                        }
                    </ul>
                    </div>
                    <div className='p-4'>
                        {
                            user.token?
                                <button className='cursor-pointer hover:text-orange-500 bg-white p-4 rounded-lg w-full flex items-center gap-2 text-lg' onClick={()=>dispatch(log_out())}>
                                    <img src={assets.logout_icon} alt="" /> <span>Logout</span>
                                </button> :
                                <button className='cursor-pointer hover:text-orange-500 bg-white p-4 rounded-lg w-full flex items-center gap-2 text-lg' onClick={()=>setShowLogIn(true)}>
                                    <img src={assets.login_icon} alt="" /> <span>Sign in</span>
                                </button>
                        }
                    </div>
            </motion.div>
    </div>
  )
}

export default SideNavBar