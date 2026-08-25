import React from 'react'
import SalonDrawerList from './components/SalonDrawerList'
import NavBar from '../Admin Salon/NavBar'
import BookingTable from '../Admin Salon/Booking/BookingTable'
import ServiceTable from '../Admin Salon/Services/ServiceTable'
import TransactionTable from '../Admin Salon/Transaction/TransactionTable'
import CategoryTable from '../Admin Salon/Category/CategoryTable'
import Category from '../Admin Salon/Category/Category'
import { Route, Routes } from 'react-router-dom'
import SalonHome from '../Admin Salon/Home/SalonHome'
import CreateServiceForm from '../Admin Salon/Services/CreateServiceForm'
import Notifications from '../Customer/Notification/Notifications'
import Payment from '../Admin Salon/Payment/Payment'
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