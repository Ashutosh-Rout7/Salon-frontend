import React from 'react'
import SalonDrawerList from './components/SalonDrawerList'
import NavBar from '../Admin Salon/NavBar'
import SalonRoutes from '../Routes/SalonRoutes'

const SalonDashboard = () => {
  return (
    <div className='min-h-screen'>
      <NavBar DrawerList={SalonDrawerList}/>
      <section className='lg:flex lg:h-[90vh]'>
         <div className='hidden lg:block h-full'>
           <SalonDrawerList/>
         </div>

         <div className='p-10 w-full lg:w-[80%] overflow-y-auto'>
           <SalonRoutes/>
         </div>
      </section>
    </div>
  )
}

export default SalonDashboard