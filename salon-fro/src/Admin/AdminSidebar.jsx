import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';
import { useauth } from '../Context/AuthContext';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { label: 'Salon Owner Requests', icon: <HowToRegIcon />, path: '/admin/salon-owner-requests' },
  { label: 'Manage Users', icon: <PeopleIcon />, path: '/admin/users' },
  { label: 'Manage Salons', icon: <StorefrontIcon />, path: '/admin/salons' },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useauth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ width: 260, borderRight: '1px solid', borderColor: 'divider', p: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, px: 1 }}>
        Admin Panel
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <ListItemButton
        onClick={handleLogout}
        sx={{ borderRadius: 2, color: 'error.main' }}
      >
        <ListItemIcon sx={{ color: 'error.main' }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Box>
  );
};

export default AdminSidebar;