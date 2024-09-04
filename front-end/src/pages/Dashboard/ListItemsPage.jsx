import { useState,useEffect } from "react"
import axios from "axios";
import {assets} from "../../assets/frontend_assets/assets"
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
const apiUrl=import.meta.env.VITE_API_URL;
function ListItemsPage() {


    const [list,setList]=useState([]);
    useEffect(()=>{
        axios.get(`${apiUrl}/food`).then(res=>{
            if(res.status===200)
            {
                setList(res.data.data);
            }
        }).catch((err)=>console.log(err))
    },[])

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
                    {list?.map((item,i)=>(<TableItem item={item} i={i} list={list} setList={setList} key={item._id}/>))}
                </AnimatePresence>
            </table>
        </div>
    </div>
  )
}
const TableItem=({item,i,setList,list})=>{
    const [loading,setLoading]=useState(false);
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
    const itemRemoveHandler=(id)=>{
        setLoading(true);
        axios.delete(`${apiUrl}/food/${id}`)
        .then((res)=>{
            if(res.status===200)
                setList(list.filter(item=>item._id!==id));
        })
        .catch((err)=>console.log(err))
        .finally(()=>setLoading(false));
    }
    return(
        <motion.tr variants={variants} initial="hidden" animate="visible" custom={i} exit={{x:"50vw",opacity:0}} transition={{duration:0.5}} className={`*:p-4 border-b-2 border-gray-200 font-medium `}>
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
                                    <td>{
                                        !loading?<motion.img whileHover={{scale:1.2}} whileTap={{scale:0.9}} src={assets.remove_icon_red} alt="" className='w-8 block m-auto cursor-pointer'
                                        onClick={()=>itemRemoveHandler(item._id)}/>:
                                        
<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-transparent ">
    <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>

                                        }</td>
                                </tr>
                                
                            </div>
                            <td className="hidden md:table-cell"><img src={item.image.url} alt="" className='w-20 block m-auto' /></td>
                            <td className="hidden md:table-cell">{item.name}</td>
                            <td className="hidden md:table-cell">${item.price}</td>
                            <td className="hidden md:table-cell">{item.category}</td>
                            <td className="hidden md:table-cell">{
                                !loading?<motion.img whileHover={{scale:1.2}} whileTap={{scale:0.9}} src={assets.remove_icon_red} alt="" className='w-8 block m-auto cursor-pointer'
                                onClick={()=>itemRemoveHandler(item._id)}/>:
                                    <div className="flex items-center justify-center">
                                                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-transparent ">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                    </div>
                                }</td>
                        </motion.tr>
    )
}
export default ListItemsPage