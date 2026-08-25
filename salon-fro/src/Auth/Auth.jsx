import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {

    const location =useLocation();

  return (
    <div className='flex justify-center items-centerh-[95vh]'>
    <div className='shadow-lg p-5'>
       {
        location.pathname ==="/register"?<RegisterForm/>:<LoginForm/>
       }
    </div>
    </div>
  )
}

export default Auth