import { useState,useEffect } from "react"
import axios from "axios";
import {assets} from "../assets/frontend_assets/assets"
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
function ListItemsPage() {
    const [list,setList]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/api/food").then(res=>{
            if(res.status===200)
                setList(res.data.data);
        }).catch((err)=>console.log(err))
    },[])
    const itemRemoveHandler=(id)=>{
        axios.delete(`http://localhost:5000/api/food/${id}`)
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
                <tr className='*:p-4 border-b-2 border-gray-200 text-gray-500'>    
                    <th className='p-4'>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Remove</th>
                </tr>
                <AnimatePresence>
                    {list?.map(item=>(
                        <motion.tr initial={{x:0,opacity:1}} exit={{x:"50vw",opacity:0}} transition={{duration:0.5}} key={item._id} className='*:p-4 border-b-2 border-gray-200 font-medium'>
                            <td><img src={item.image.url} alt="" className='w-20 block m-auto' /></td>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.category}</td>
                            <td><motion.img whileHover={{scale:1.2}} whileTap={{scale:0.9}} src={assets.remove_icon_red} alt="" className='w-8 block m-auto cursor-pointer'
                            onClick={()=>itemRemoveHandler(item._id)}/></td>
                        </motion.tr>))}
                </AnimatePresence>
            </table>
        </div>
    </div>
  )
}

export default ListItemsPage