import React from 'react';
import { Box } from '@mui/material';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'grey.50' }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;