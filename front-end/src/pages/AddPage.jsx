import { useEffect, useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import { menu_list} from '../assets/frontend_assets/assets'
import axios from 'axios'
function AddPage() {
    const apiUrl=import.meta.env.VITE_API_URL;
    const [image,setImage]=useState(null);
    const submitItem=(formData)=>{
        const config={
            method:"post",
            url:`${apiUrl}/food`,
            data:formData
        };
        axios.request(config).then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        });
    }
    // const sendAll=async ()=>{
    //     for(let i of food_list){
    //         const res=await fetch(i.image);
    //         const img=await res.blob();
    //         console.log(img);
    //         const config={
    //             url:"http://localhost:5000/api/food",
    //             method:"post",
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //               },
    //             data:{
    //                 name:i.name,
    //                 description:i.description,
    //                 price:i.price,
    //                 image:img,
    //                 category:i.category,
    //             }
    //         }
    //         axios.request(config).then(res=>console.log(res.data)).catch(err=>console.log(err))
    //     }
    // }
  return (
    <div>
        {/* {<button onClick={()=>sendAll()}>send all</button>} */}
        <form className='flex flex-col gap-8 w-full md:w-1/2' onSubmit={(e)=>{
            e.preventDefault();
            const formData=new FormData(e.target);
            submitItem(formData);
            e.target.reset();
        }}>
            <div>
                <label htmlFor="image" className='cursor-pointer'>
                    <h1 className='mb-2'>Upload Image</h1>
                    <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" className='w-32'/>
                </label>
                <input type="file" name="image" id="image" className='hidden' onChange={e=>setImage(e.target.files[0])} />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="name">Product name</label>
                <input className='p-4 bg-gray-200' type="text" name="name" id="name" placeholder='Product name' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="desc">Product description</label>
                <textarea className='p-4 bg-gray-200' name="description" id="desc" placeholder='Write content here'></textarea>
            </div>
            <div className='flex flex-col md:flex-row gap-8 w-full'> 
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="category">Choose a car:</label>
                    <select className='p-4 bg-gray-200 cursor-pointer' name="category" id="category">
                    {
                        menu_list.map(item=>(<option key={item.menu_name} value={item.menu_name}>{item.menu_name}</option>))
                    }
                    </select>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="price">Price</label>
                    <input className='p-4 bg-gray-200' type="number" name="price" id="price" />
                </div>
            </div>
            <button type="submit" className='text-lg bg-black text-white w-fit py-4 px-12 outline-4 outline-gray-200 hover:outline'>Add</button>
        </form>
    </div>
  )
}

export default AddPage