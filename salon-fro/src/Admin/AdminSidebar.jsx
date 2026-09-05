import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';
import ShieldIcon from '@mui/icons-material/Shield';
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
  const { logout, user } = useauth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: 268,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0B1F14',
        color: '#fff',
        py: 3,
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Brand header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 3, mb: 4 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #019031, #02b03e)',
          }}
        >
          <ShieldIcon sx={{ color: '#fff', fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={800} sx={{ lineHeight: 1.1 }}>
            Admin Panel
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>
            Salon Booking
          </Typography>
        </Box>
      </Box>

      {/* Nav items */}
      <List sx={{ flexGrow: 1, px: 2 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              selected={active}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.75,
                py: 1.1,
                color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                bgcolor: active ? 'rgba(1,144,49,0.35)' : 'transparent',
                borderLeft: active ? '3px solid #02d04a' : '3px solid transparent',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                },
                '&.Mui-selected:hover': {
                  bgcolor: 'rgba(1,144,49,0.45)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: active ? 700 : 500, fontSize: 14.5 }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2, my: 1 }} />

      {/* User + logout */}
      <Box sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, py: 1.5, mb: 1 }}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: '#019031', fontSize: 14, fontWeight: 700 }}>
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.fullName || 'Admin'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }} noWrap>
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: '#ff6b6b',
            '&:hover': { bgcolor: 'rgba(255,107,107,0.1)' },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600, fontSize: 14.5 }} />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default AdminSidebar;