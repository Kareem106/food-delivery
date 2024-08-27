import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Footer() {
  return (
    <div className='bg-black/90 pt-16 pb-8 text-gray-300'>
        <div className='container mx-auto'>
            <div className=' grid gird-cols-1 px-4 md:px-0 md:grid-cols-3 gap-12'>
                <div className='flex flex-col gap-4'>
                    <img src={assets.logo} alt="" className='w-fit'/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero accusantium corporis, et reiciendis nihil nesciunt nam natus, quaerat qui modi eligendi id culpa recusandae voluptas ullam, ea placeat quibusdam voluptates.</p>
                    <div className='flex gap-4'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl text-gray-300 font-bold mb-4'>COMPANY</h1>
                    <ul>
                        <li>
                            Home
                        </li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-2xl text-gray-300 font-bold mb-4'>GET-IN-TOUCH</h1>
                    <ul>
                        <li>+123 456 789</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr className='my-8 border-gray-500'/>
            <h1 className='text-center'>Copyright 2024 @ Tomato.com - All Rights Reserved</h1>
        </div>
    </div>
  )
}

export default Footer