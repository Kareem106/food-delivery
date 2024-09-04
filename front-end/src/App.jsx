
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import Layout from './Layout/Layout'
import DashBoard from './Layout/DashBoard'
import AddPage from './pages/Dashboard/AddPage'
import ListItemsPage from './pages/Dashboard/ListItemsPage'
import OrdersPage from './pages/Dashboard/OrdersPage'
import CheckOutPage from './pages/CheckOutPage'
import AdminProtectRouting from './components/AdminProtectRouting'
import UserProtectRouting from './components/UserProtectRouting'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserOrders from './pages/UserOrders'
import VerifyPage from './pages/VerifyPage'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Spinner from './components/Spinner'
function App() {
  const apiUrl=import.meta.env.VITE_API_URL;
const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<HomePage />
      },
      {
        path:"/cart",
        element:<CartPage />
      },
      {
        path:"/checkout",
        element:
        <UserProtectRouting>
          <CheckOutPage/>
        </UserProtectRouting>
      },
      {
        path:"/orders",
        element:
        <UserProtectRouting>
          <UserOrders/>
        </UserProtectRouting>
      },
      {
        path:"/orders/:id/verify",
        element:<UserProtectRouting>
          <VerifyPage/>
        </UserProtectRouting>
      }
      
    ]
  },
  {
    path:"/dashboard",
    element:
    <AdminProtectRouting>
      <DashBoard/>
    </AdminProtectRouting>,
    children:[
      {
        path:"/dashboard/add",
        element:<AddPage/>
      },{
        path:"/dashboard/list",
        element:<ListItemsPage/>
      },{
        path:"/dashboard/orders",
        element:<OrdersPage/>
      }
    ]
  }
])
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    axios.get(`${apiUrl}/test`)
    .then(res=>{
      if(res.status===200){
        console.log(res.data.message);
        setLoading(false);
      }
    })
    .catch(err=>{
      console.log(err);
      window.location.reload();
    });
  },[])
  return (
    <div>
      {
      loading?
      <div className='h-screen flex justify-center items-center flex-col gap-8'>
            <div className='w-[100px]'>
              <Spinner/>
            </div>
      </div>
      :
        <div>
        <ToastContainer/>
          <RouterProvider router={router} />
        </div>
    }
    </div>
  )
}

export default App
