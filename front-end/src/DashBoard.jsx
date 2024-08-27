
import { assets } from './assets/admin_assets/assets'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function DashBoard() {
  return (
    <div>
        <header className='border-b-2'>
            <div className='container flex justify-between items-center mx-auto py-2 px-2 md:px-0'>
            <img src={assets.logo} alt="" />
            <img src={assets.profile_image} alt="" />
            </div>
        </header>
        <div className='md:container mx-auto flex min-h-screen'>
            <div className='py-12 border-e-2 ps-2 md:ps-0'>
                <ul className='flex flex-col gap-12 text-lg'>
                    <Link to="/dashboard/add">
                        <li className='flex gap-2 items-center p-2 border-2 border-e-0 hover:bg-orange-200/50 cursor pointer justify-center md:justify-start'>
                            <img src={assets.add_icon} alt="" />
                            <span className='hidden md:block'>Add</span>
                        </li>
                    </Link>
                    <Link  to="/dashboard/list"> 
                        <li className='flex gap-2 items-center p-2 border-2 border-e-0 hover:bg-orange-200/50 cursor pointer justify-center md:justify-start'>
                            <img src={assets.order_icon} alt="" />
                            <span className='hidden md:block'>List Items</span>
                        </li>
                    </Link>
                    <Link  to="/dashboard/orders">
                        <li className='flex gap-2 items-center p-2 border-2 border-e-0 hover:bg-orange-200/50 cursor pointer justify-center md:justify-start'>
                            <img src={assets.order_icon} alt="" />
                            <span className='hidden md:block'>Orders</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className='w-full p-8 flex-1'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashBoard