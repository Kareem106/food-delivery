
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Layout from './Layout'
import DashBoard from './DashBoard'
import AddPage from './pages/AddPage'
import ListItemsPage from './pages/ListItemsPage'
import CheckOutPage from './pages/CheckOutPage'
import ProtectRouting from './components/ProtectRouting'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/cart",
        element:<Cart />
      },
      {
        path:"/checkout",
        element:<CheckOutPage/>
      }
    ]
  },
  {
    path:"/dashboard",
    element:<ProtectRouting>
      <DashBoard/>
    </ProtectRouting>,
    children:[
      {
        path:"/dashboard/add",
        element:<AddPage/>
      },{
        path:"/dashboard/list",
        element:<ListItemsPage/>
      }
    ]
  }
])
  return (
    <div>
      <ToastContainer/>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
