import MenuIcon from '@mui/icons-material/Menu'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { Badge, Drawer, IconButton } from '@mui/material'
import React, { useState } from 'react'

const NavBar = ({ DrawerList }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newopen) => {
    setOpen(newopen);
  };

  return (
    <div className='h-[10vh] flex items-center justify-between px-5 border-b'>
      <div className='flex items-center gap-3'>
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon color='primary' />
        </IconButton>
        <h1 className='text-xl cursor-pointer font-bold pl-2'>Salon Booking</h1>
      </div>

      <IconButton>
        <Badge color='secondary' badgeContent={5}>
          <NotificationsActiveIcon color='primary' />
        </Badge>
      </IconButton>

      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default NavBar;