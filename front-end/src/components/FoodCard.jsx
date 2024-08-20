import { useEffect, useState } from "react"
import { assets } from "../assets/frontend_assets/assets"
import { useDispatch, useSelector } from "react-redux";
import { addToCart,decreaseItem,removeFromCart } from "../app/cartSlice";
import { motion } from "framer-motion";
function FoodCard({_id,name,image,price,description}) {
  const itemCount=useSelector(state=>state.cart.find(item=>item._id===_id)?.count || 0);
  const dispatch=useDispatch();
  return (
    <motion.div initial={{y:"200px",opacity:0}} whileInView={{y:0,opacity:1}} viewport={{ once: true }} transition={{duration:0.5}}>
        <div className="relative">
            <img className="w-full rounded-t-[15px]" src={image.url} alt="" />
            <div className="absolute bottom-4 right-4">
              {
                !itemCount?
                  <motion.img whileHover={{scale:1.2}} whileTap={{scale:0.9}} className="cursor-pointer" src={assets.add_icon_white} alt=""
                  onClick={()=>dispatch(addToCart(_id))}/>
                  :
                  <div className="flex gap-4 items-center rounded-full bg-white p-2">
                    <motion.img whileHover={{scale:1.2}} whileTap={{scale:0.9}} className="cursor-pointer" src={assets.remove_icon_red}
                    onClick={()=>{
                      if(itemCount>1)dispatch(decreaseItem(_id))
                        else dispatch(removeFromCart(_id))
                    }}/>
                    <motion.p initial={{y:"-100%"}} animate={{y:0}} className="text-lg">{itemCount}</motion.p>
                    <motion.img whileHover={{scale:1.2}} whileTap={{scale:0.9}} className="cursor-pointer" src={assets.add_icon_green}
                    onClick={()=>dispatch(addToCart(_id))}/>
                  </div>
              }
            </div>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-medium">{name}</h2>
                <img className="w-28" src={assets.rating_starts} alt="" />
            </div>
            <p className="text-gray-500">{description}</p>
            <p className="text-orange-500 font-medium my-2 text-3xl">${price}</p>
        </div>
    </motion.div>
  )
}

export default FoodCard