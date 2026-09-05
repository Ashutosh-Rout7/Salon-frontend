import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import { useauth } from "../../Context/AuthContext";
import { requestSalonOwner } from "../../AllServices/Authservice";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { user, logout } = useauth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [submittingPartner, setSubmittingPartner] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const open = Boolean(anchorEl);

  // Open profile menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close profile menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Go to home
  const handleHome = () => {
    navigate("/");
    handleClose();
  };

  // Go to bookings
  const handleBookings = () => {
    navigate("/bookings");
    handleClose();
  };

  // Go to salon dashboard
  const handleDashboard = () => {
    navigate("/salon-dashboard");
    handleClose();
  };

  // Go to admin dashboard
  const handleAdminDashboard = () => {
    navigate("/admin/dashboard");
    handleClose();
  };

  // Logout
  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  // ------------------------------------------------------
  // BECOME PARTNER — submits a salon-owner request
  // ------------------------------------------------------
  const handleBecomePartner = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!user.email) {
      setSnackbar({ open: true, message: "Unable to submit request — missing email.", severity: "error" });
      return;
    }

    setSubmittingPartner(true);

    try {
      await requestSalonOwner(user.email);
      setSnackbar({
        open: true,
        message: "Request submitted. Awaiting admin approval.",
        severity: "success",
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to submit request. Please try again.";
      setSnackbar({
        open: true,
        message: typeof msg === "string" ? msg : "Failed to submit request.",
        severity: "error",
      });
    } finally {
      setSubmittingPartner(false);
    }
  };

  return (
    <div className="z-50 px-6 flex items-center justify-between py-2 fixed top-0 left-0 right-0 bg-white">

      {/* ================= LEFT SIDE ================= */}
      <div className="flex items-center gap-10">

        {/* Logo */}
        <h1
          onClick={handleHome}
          className="cursor-pointer font-bold lg:text-2xl"
        >
          Salon Service
        </h1>

        {/* Home */}
        <div className="lg:flex items-center gap-5 hidden">
          <h1
            onClick={handleHome}
            className="cursor-pointer hover:text-primary-color"
          >
            Home
          </h1>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex items-center gap-3 md:gap-6">

        {/* Become Partner — only shown to customers, hidden for owners/admins */}
        {(!user || user.role === "CUSTOMER") && (
          <Button
            variant="outlined"
            onClick={handleBecomePartner}
            disabled={submittingPartner}
          >
            {submittingPartner ? "Submitting..." : "Become Partner"}
          </Button>
        )}

        {/* Notifications */}
        <IconButton onClick={() => navigate("/notifications")}>
          <Badge badgeContent={5} color="secondary">
            <NotificationsActiveIcon color="primary" />
          </Badge>
        </IconButton>

        {/* ================= LOGGED IN USER ================= */}
        {user ? (
          <div className="flex gap-1 items-center">

            {/* User Name */}
            <h1 className="text-lg font-semibold hidden lg:block">
              {user?.fullName}
            </h1>

            {/* Avatar */}
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                }}
              >
                {user?.fullName
                  ? user.fullName.charAt(0).toUpperCase()
                  : "U"}
              </Avatar>
            </IconButton>

            {/* Profile Menu */}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >

              {/* My Bookings */}
              <MenuItem onClick={handleBookings}>
                My Bookings
              </MenuItem>

              {/* ================= SALON OWNER ONLY ================= */}
              {user?.role === "SALON_OWNER" && (
                <MenuItem onClick={handleDashboard}>
                  Dashboard
                </MenuItem>
              )}

              {/* ================= ADMIN ONLY ================= */}
              {user?.role === "ADMIN" && (
                <MenuItem onClick={handleAdminDashboard}>
                  Admin Dashboard
                </MenuItem>
              )}

              {/* Logout */}
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>

            </Menu>
          </div>
        ) : (

          /* ================= NOT LOGGED IN ================= */
          <div className="flex gap-2 items-center">

            {/* Login */}
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            {/* Register */}
            <Button
              variant="contained"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>

          </div>
        )}
      </div>

      {/* Feedback for Become Partner action */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Navbar;