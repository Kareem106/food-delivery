
import { assets } from './assets/admin_assets/assets'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function DashBoard() {
  return (
    <div>
        <header className='border-b-2'>
            <div className='container flex justify-between items-center mx-auto py-2'>
            <img src={assets.logo} alt="" />
            <img src={assets.profile_image} alt="" />
            </div>
        </header>
        <div className='container mx-auto flex min-h-screen'>
            <div className='w-1/5 py-12 border-e-2'>
                <ul className='flex flex-col gap-12 text-lg'>
                    <Link to="/dashboard/add">
                        <li className='flex gap-2 items-center p-2 border-2 border-e-0 hover:bg-orange-200/50 cursor pointer'>
                            <img src={assets.add_icon} alt="" />
                            <span>Add</span>
                        </li>
                    </Link>
                    <Link  to="/dashboard/list"> 
                        <li className='flex gap-2 items-center p-2 border-2 border-e-0 hover:bg-orange-200/50 cursor pointer'>
                            <img src={assets.order_icon} alt="" />
                            <span>List Items</span>
                        </li>
                    </Link>
                    <Link  to="/dashboard/orders">
                        <li className='flex gap-2 items-center p-2 border-2 border-e-0 hover:bg-orange-200/50 cursor pointer'>
                            <img src={assets.order_icon} alt="" />
                            <span>Orders</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className='p-14 w-full'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashBoard