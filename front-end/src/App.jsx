
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Layout from './Layout'
import DashBoard from './DashBoard'
import AddPage from './pages/AddPage'
import ListItemsPage from './pages/ListItemsPage'
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
    ]
  },
  {
    path:"/dashboard",
    element:<DashBoard/>,
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
        <RouterProvider router={router} />
    </div>
  )
}

export default App
