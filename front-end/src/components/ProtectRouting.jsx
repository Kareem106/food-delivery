import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function ProtectRouting({children}) {
    const user=useSelector(state=>state.user);
    if(!user.token || user.role!=="admin"){
        return <Navigate to={"/"}/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectRouting