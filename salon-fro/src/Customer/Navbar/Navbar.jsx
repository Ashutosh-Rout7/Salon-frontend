import React, { useState } from "react";
import { Avatar, Badge, Button, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import { useauth } from "../../Context/AuthContext";

const Navbar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const { user, logout } = useauth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  return (
    <div className="z-50 px-6 flex items-center justify-between py-2 fixed top-0 left-0 right-0 bg-white">
      <div className="flex items-center gap-10">
        <h1 onClick={() => navigate("/")} className="cursor-pointer font-bold lg:text-2xl">
          Salon Service
        </h1>
        <div className="lg:flex items-center gap-5 hidden">
          <h1 onClick={() => navigate("/")} className="cursor-pointer hover:text-primary-color">Home</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <Button variant="outlined">Become Partner</Button>

        <IconButton onClick={() => navigate("/notifications")}>
          <Badge badgeContent={5} color="secondary">
            <NotificationsActiveIcon color="primary" />
          </Badge>
        </IconButton>

        {user ? (
          <div className="flex gap-1 items-center">
            <h1 className="text-lg font-semibold hidden lg:block">
              {user?.fullName}
            </h1>

            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                {user.fullName[0].toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{ list: { "aria-labelledby": "basic-button" } }}
            >
              <MenuItem onClick={() => { navigate("/bookings"); handleClose(); }}>
                My Bookings
              </MenuItem>
              <MenuItem onClick={() => { navigate("/dashboard"); handleClose(); }}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="contained" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;