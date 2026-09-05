import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashBoard from './pages/AdminDashboard';
import SalonOwnerRequests from './pages/SalonOwnerRequests';
import ManageUsers from './pages/ManageUsers';
import ManageSalons from './pages/ManageSalons';
import AdminRoute from './AdminRoute';
import AdminLayout from './AdminLayout';


const AdminRoutes = () => {
  return (
    <AdminRoute>
      <AdminLayout>
        <Routes>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="salon-owner-requests" element={<SalonOwnerRequests />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="salons" element={<ManageSalons />} />
        </Routes>
      </AdminLayout>
    </AdminRoute>
  );
};

export default AdminRoutes;