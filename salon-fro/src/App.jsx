import {Button,ThemeProvider } from '@mui/material';
import greenTheme from './theme/greenTheme';
import { Route, Routes } from 'react-router-dom';
import SalonDashboard from './Seller/SalonDashboard';
import CustomerRoutes from './Routes/CustomerRoutes';
import RegisterForm from './Auth/RegisterForm';
import LoginForm from './Auth/LoginForm';
import Footer from './Customer/footer/Footer';

function App() {

  return (  
    <ThemeProvider theme={greenTheme}>

         <Routes>
           <Route path='/salon-dashboard/*' element={<SalonDashboard/>}/>
           <Route path='/register' element={<RegisterForm/>}/>
           <Route path='/login' element={<LoginForm/>}/>
           <Route path='*' element={<CustomerRoutes/>}/>
         </Routes>

         <Footer/>
    </ThemeProvider>
  )
}

export default App

//we will keep all componenets inside ThemeProvider component