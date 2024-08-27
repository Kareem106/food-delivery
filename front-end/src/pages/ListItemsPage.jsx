import { useState,useEffect } from "react"
import axios from "axios";
import {assets} from "../assets/frontend_assets/assets"
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
function ListItemsPage() {
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
    const [list,setList]=useState([]);
    useEffect(()=>{
        axios.get(`${apiUrl}/food`).then(res=>{
            if(res.status===200)
            {
                setList(res.data.data);
            }
        }).catch((err)=>console.log(err))
    },[])
    const itemRemoveHandler=(id)=>{
        axios.delete(`${apiUrl}/api/food/${id}`)
        .then((res)=>{
            if(res.status===200)
                setList(list.filter(item=>item._id!==id));
        })
        .catch((err)=>console.log(err));
    }
  return (
    <div>
                <div>
            <table className='w-full text-center mb-12 border-2 overflow-hidden'>
                <tr className='hidden md:table-row *:p-4 border-b-2 border-gray-200 text-gray-500'>    
                    <th className='p-4'>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Remove</th>
                </tr>
                <AnimatePresence>
                    {list?.map((item,i)=>(
                        <motion.tr variants={variants} initial="hidden" animate="visible" custom={i} exit={{x:"50vw",opacity:0}} transition={{duration:0.5}} key={item._id} className='*:p-4 border-b-2 border-gray-200 font-medium'>
                                                        <div className="md:hidden w-full">
                                <tr className='*:p-4 border-b-2 border-gray-200 text-gray-500 flex items-center text-center justify-between'>
                                    <th>Image</th>
                                    <td><img src={item.image.url} alt="" className='w-20 block m-auto' /></td>
                                </tr>
                                    <tr className='*:p-4 border-b-2 border-gray-200 text-gray-500 flex items-center text-center justify-between'>
                                    <th>Name</th>
                                    <td>{item.name}</td>
                                </tr>
                                <tr className='*:p-4 border-b-2 border-gray-200 text-gray-500 flex items-center text-center justify-between'>
                                    <th>Price</th>
                                    <td>${item.price}</td>
                                </tr>
                                <tr className='*:p-4 border-b-2 border-gray-200 text-gray-500 flex items-center text-center justify-between'>
                                    <th>Category</th>
                                    <td>{item.category}</td>
                                </tr>
                                <tr className='*:p-4 border-b-2 border-gray-200 text-gray-500 flex items-center text-center justify-between'>
                                    <th>Remove</th>
                                    <td><motion.img whileHover={{scale:1.2}} whileTap={{scale:0.9}} src={assets.remove_icon_red} alt="" className='w-8 block m-auto cursor-pointer'
                                    onClick={()=>itemRemoveHandler(item._id)}/></td>
                                </tr>
                                
                            </div>
                            <td className="hidden md:table-cell"><img src={item.image.url} alt="" className='w-20 block m-auto' /></td>
                            <td className="hidden md:table-cell">{item.name}</td>
                            <td className="hidden md:table-cell">${item.price}</td>
                            <td className="hidden md:table-cell">{item.category}</td>
                            <td className="hidden md:table-cell"><motion.img whileHover={{scale:1.2}} whileTap={{scale:0.9}} src={assets.remove_icon_red} alt="" className='w-8 block m-auto cursor-pointer'
                            onClick={()=>itemRemoveHandler(item._id)}/></td>
                        </motion.tr>))}
                </AnimatePresence>
            </table>
        </div>
    </div>
  )
}

export default ListItemsPage