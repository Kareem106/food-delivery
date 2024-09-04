import { useState } from 'react';
import NavBar from '../components/NavBar'
import LogInPopUp from '../components/LogInPopUp'
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SideNavBar from '../components/SideNavBar';
import Footer from '../components/Footer';
function Layout() {
    const [showLogIn,setShowLogIn]=useState(false);
    const [sideBarCollapse,setSideBarCollapse]=useState(true);
  return (
    <div>
      <NavBar setShowLogIn={setShowLogIn} setSideBarCollapse={setSideBarCollapse}/>
      <AnimatePresence>
        {!sideBarCollapse?<SideNavBar setSideBarCollapse={setSideBarCollapse} setShowLogIn={setShowLogIn}/>:null}
        </AnimatePresence>
      <div className='lg:container mx-auto px-4 pt-20'>
        <AnimatePresence>
        {showLogIn?<LogInPopUp setShowLogIn={setShowLogIn}/>:null}
        </AnimatePresence>
        <Outlet setShowLogIn={setShowLogIn}/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout