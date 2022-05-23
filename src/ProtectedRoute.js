import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Navigate, Outlet} from 'react-router-dom'


const tokenAuth=()=>{
  const token=reactLocalStorage.getItem('token')
  if(token){
    return true
  } 
    return false
  
}

const  ProtectedRoutes=(props) =>{

  const auth=tokenAuth()

  return auth ? <Outlet/>: <Navigate to="/"/>
}

export default ProtectedRoutes;