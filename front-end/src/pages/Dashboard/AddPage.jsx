import { useEffect, useState } from 'react'
import { assets } from '../../assets/admin_assets/assets'
import { menu_list} from '../../assets/frontend_assets/assets'
import axios from 'axios'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { productSchema } from '../../schemas';
function AddPage() {
    const apiUrl=import.meta.env.VITE_API_URL;
    const submitItem=(values)=>{
        const formData=new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const config={
            method:"post",
            url:`${apiUrl}/food`,
            data:formData
        };
        axios.request(config).then(res=>{
            toast.success(res.data.message);
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
    const {values,errors,isSubmitting,handleBlur,handleChange,handleSubmit,setFieldValue,touched}=useFormik({
        initialValues:{
            name:"",
            description:"",
            price:"",
            image:null,
            category:""
        },
        validationSchema:productSchema,
        onSubmit:(values,actions)=>{
            // submitItem(values);
            console.log(values.image.buffer);
            submitItem(values)
            actions.resetForm();
        }
    })
  return (
    <div>
        {/* {<button onClick={()=>sendAll()}>send all</button>} */}
        <form className='flex flex-col gap-8 w-full md:w-1/2' onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label htmlFor="image" className='cursor-pointer'>
                    <h1 className='mb-2'>Upload Image</h1>
                    <img src={values?.image? URL.createObjectURL(values?.image):assets.upload_area} alt="" className='w-32'/>
                </label>
                <input 
                onChange={(e)=>{
                    console.log(e.target.files[0]);
                    setFieldValue("image",e.target.files[0]);
                }}
                onBlur={handleBlur}
                type="file" name="image" id="image" className='hidden' />
                {errors.image && touched.image?<p className='text-red-500'>{errors.image}</p>:null}
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="name">Product name</label>
                <input onChange={handleChange} onBlur={handleBlur} className='p-4 bg-gray-200' type="text" name="name" id="name" placeholder='Product name' />
                {errors.name && touched.name?<p className='text-red-500'>{errors.name}</p>:null}
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="desc">Product description</label>
                <textarea onChange={handleChange} onBlur={handleBlur} className='p-4 bg-gray-200' name="description" id="desc" placeholder='Write content here'></textarea>
                {errors.description && touched.description?<p className='text-red-500'>{errors.description}</p>:null}
            </div>
            <div className='flex flex-col md:flex-row gap-8 w-full'> 
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="category">Choose a category:</label>
                    <select onChange={handleChange} onBlur={handleBlur} className='p-4 bg-gray-200 cursor-pointer' name="category" id="category">
                    <option disabled selected value> -- select an option -- </option>
                    {
                        menu_list.map(item=>(<option key={item.menu_name} value={item.menu_name}>{item.menu_name}</option>))
                    }
                    </select>
                    {errors.category && touched.category?<p className='text-red-500'>{errors.category}</p>:null}
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="price">Price</label>
                    <input onChange={handleChange} onBlur={handleBlur} className='p-4 bg-gray-200' type="number" name="price" id="price" placeholder='Product price'/>
                    {errors.price && touched.price?<p className='text-red-500'>{errors.price}</p>:null}
                </div>
            </div>
            <button type="submit" className={`text-lg bg-black text-white w-fit py-4 px-12 outline-4 outline-gray-200 hover:outline ${(errors.name||errors.price || errors.category || errors.image || isSubmitting)?'opacity-50':''}`} disabled={isSubmitting}>Add</button>
        </form>
    </div>
  )
}

export default AddPage