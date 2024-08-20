import React, { useEffect, useState } from 'react'
import { menu_list } from '../assets/frontend_assets/assets'
import { useSelector } from 'react-redux';
import FoodCard from '../components/FoodCard';
import { motion } from 'framer-motion';
import axios from 'axios';
function Home() {
    const [foodList,setFoodList]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/api/food").then(res=>{
            if(res.status===200)
                setFoodList(res.data.data);
        })
        .catch(err=>console.log(err))
    },[])
    const [activeCategory,setActiveCategory]=useState("All");
  return (
    <div>
        <div className="w-full h-[650px] bg-[url('/header_img.png')] bg-cover relative mb-8">
            <div className='flex flex-col items-start gap-8 absolute bottom-8 left-4 p-8 text-white'>
                <motion.h1 initial={{y:"-200px",opacity:0}} animate={{y:0,opacity:1}} className='text-6xl font-medium'>Order your <br /> favorite food here</motion.h1>
                <motion.p className='w-1/2' initial={{x:"-200px",opacity:0}} animate={{x:0,opacity:1}}>choose from a diverse meny featuring delectable array of dishes crafted with the finest ingredients and culinary expertise. Our misson to satisfy your craving and elevate your dining experience, one delicous meal at a time.</motion.p>
                <motion.button
                initial={{x:"-200px",opacity:0}}
                animate={{x:0,opacity:1}}
                whileHover={{scale:1.1}}
                whileTap={{scale:0.8}}
                className='bg-white text-gray-500 px-8 py-4 rounded-full font-medium'>View Menu</motion.button>
            </div>
        </div>
        <div className='mb-8'>
            <h1 className='text-4xl font-medium text-gray-700 mb-4'>Explore our menu</h1>
            <p className=' w-1/2 font-medium text-gray-500 text-lg mb-8'>choose from a diverse meny featuring delectable array of dishes. Our misson to satisfy your craving and elevate your dining experience.</p>
            <div className='flex gap-2 justify-around items-center w-full'>
                {
                    menu_list.map(item=>(<motion.div initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5}} viewport={{once:true,margin:"-50px"}} key={item.menu_name} className='cursor-pointer'
                    onClick={()=>setActiveCategory(prev=>prev===item.menu_name?"All":item.menu_name)}>
                        <img className={`w-42 mb-2 ${activeCategory===item.menu_name?"outline":""} outline-4 rounded-full outline-orange-500 outline-offset-2`} src={item.menu_image} alt="" />
                        <h2 className='text-center text-2xl text-gray-500 font-medium'>{item.menu_name}</h2>
                    </motion.div>))
                }
            </div>
        </div>
        <hr />
        <div>
                <h1 className='text-4xl font-medium text-gray-700 my-8'>Top dishes near you</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center'>
                    {
                        foodList.map(item=>activeCategory==="All"|| activeCategory===item.category?<FoodCard key={item._id} {...item}/>:null)
                    }
                    </div>
            </div>
    </div>
  )
}

export default Home