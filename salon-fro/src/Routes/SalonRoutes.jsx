import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SalonHome from '../Admin Salon/Home/SalonHome'
import ServiceTable from '../Admin Salon/Services/ServiceTable'
import CreateServiceForm from '../Admin Salon/Services/CreateServiceForm'
import BookingTable from '../Admin Salon/Booking/BookingTable'
import Category from '../Admin Salon/Category/Category'
import TransactionTable from '../Admin Salon/Transaction/TransactionTable'
import Notifications from '../Customer/Notification/Notifications'
import Payment from '../Admin Salon/Payment/Payment'
import Profile from '../Admin Salon/Profile/Profile'

const SalonRoutes = () => {
  return (
    <div>
         <Routes>
            <Route path='/' element={<SalonHome/>}/>
            <Route path='/services' element={<ServiceTable/>}/>
            <Route path='/add-services' element={<CreateServiceForm/>}/>
            <Route path='/bookings' element={ <BookingTable/>}/>
            <Route path='/category' element={ <Category/>}/>
            <Route path='/transaction' element={<TransactionTable/> }/>
            <Route path='/notifications' element={<Notifications/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/account' element={<Profile/>}/>
          </Routes>
    </div>
  )
}

export default SalonRoutes