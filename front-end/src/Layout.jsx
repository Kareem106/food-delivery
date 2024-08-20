import { useState } from 'react';
import NavBar from './components/NavBar'
import LogInPopUp from './components/LogInPopUp'
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
function Layout() {
    const [showLogIn,setShowLogIn]=useState(false);
  return (
    <div className='lg:container mx-auto px-4 lg:px-0'>
      <AnimatePresence>
    {showLogIn?<LogInPopUp setShowLogIn={setShowLogIn}/>:null}
      </AnimatePresence>
    <NavBar setShowLogIn={setShowLogIn}/>
    <Outlet/>
</div>
  )
}

export default Layout