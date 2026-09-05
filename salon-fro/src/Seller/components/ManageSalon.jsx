import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Card, CardContent, Container, Grid,
  TextField, Typography, Avatar, Alert, CircularProgress, Backdrop,
} from "@mui/material";
import {
  Storefront, LocationCity, LocationOn, Email, Phone, AccessTime, Save,
} from "@mui/icons-material";

import { updateSalon } from "../../AllServices/Salonservice";
import { useSalon } from "../../Context/SalonContext";

const ManageSalon = () => {
  const navigate = useNavigate();
  const { mySalon, salonId, mySalonLoading, refreshMySalon } = useSalon();

  const [formData, setFormData] = useState({
    name: "",
    images: [],
    city: "",
    address: "",
    email: "",
    phoneNumber: "",
    openTime: "",
    closeTime: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ------------------------------------------------------
  // GUARD: no salon yet -> owner shouldn't be on this page
  // ------------------------------------------------------
  useEffect(() => {
    if (mySalonLoading) return;

    if (!mySalon) {
      navigate("/create-salon");
    }
  }, [mySalon, mySalonLoading, navigate]);

  // ------------------------------------------------------
  // PREFILL form once mySalon data is available
  // ------------------------------------------------------
  useEffect(() => {
    if (mySalon) {
      setFormData({
        name: mySalon.name || "",
        images: mySalon.images || [],
        city: mySalon.city || "",
        address: mySalon.address || "",
        email: mySalon.email || "",
        phoneNumber: mySalon.phoneNumber || "",
        openTime: mySalon.openTime || "",
        closeTime: mySalon.closeTime || "",
      });
    }
  }, [mySalon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!salonId) {
      setError("Salon ID missing — cannot update.");
      return;
    }

    if (
      formData.openTime &&
      formData.closeTime &&
      formData.openTime >= formData.closeTime
    ) {
      setError("Closing time must be after opening time.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        images: formData.images,
        city: formData.city,
        address: formData.address,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        openTime: formData.openTime,
        closeTime: formData.closeTime,
      };

      await updateSalon(salonId, payload);

      // pull fresh data into context so navbar/dashboard/etc.
      // reflect the change immediately, not just this page
      await refreshMySalon();

      setSuccess(true);

      // give the user a moment to see the success message,
      // then redirect to the dashboard
      setTimeout(() => {
        navigate("/salon-dashboard/dashboard"); // adjust to your actual dashboard route
      }, 1000);

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to update salon. Please try again.";
      setError(typeof msg === "string" ? msg : "Failed to update salon.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/salon-dashboard"); // adjust to your actual dashboard route
  };

  if (mySalonLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Backdrop
        open={submitting}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          Manage Salon
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update your salon's information.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
          Salon updated successfully.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card
          elevation={0}
          sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, mb: 3 }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Avatar sx={{ bgcolor: "primary.light", color: "primary.main" }}>
                <Storefront />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Basic Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Update the salon's basic details.
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth required label="Salon Name" name="name"
                  value={formData.name} onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth required label="City" name="city"
                  value={formData.city} onChange={handleChange}
                  InputProps={{ startAdornment: <LocationCity sx={{ mr: 1, color: "text.secondary" }} /> }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth required label="Email" type="email" name="email"
                  value={formData.email} onChange={handleChange}
                  InputProps={{ startAdornment: <Email sx={{ mr: 1, color: "text.secondary" }} /> }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth required label="Address" name="address"
                  value={formData.address} onChange={handleChange}
                  multiline rows={3}
                  InputProps={{ startAdornment: <LocationOn sx={{ mr: 1, mt: 1, color: "text.secondary" }} /> }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth required label="Phone Number" name="phoneNumber"
                  value={formData.phoneNumber} onChange={handleChange}
                  InputProps={{ startAdornment: <Phone sx={{ mr: 1, color: "text.secondary" }} /> }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth required type="time" label="Opening Time" name="openTime"
                  value={formData.openTime} onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ startAdornment: <AccessTime sx={{ mr: 1, color: "text.secondary" }} /> }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth required type="time" label="Closing Time" name="closeTime"
                  value={formData.closeTime} onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit" variant="contained" size="large"
            startIcon={<Save />} disabled={submitting}
            sx={{ py: 1.4, px: 4, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            type="button" variant="outlined" size="large"
            disabled={submitting}
            onClick={handleCancel}
            sx={{ py: 1.4, px: 4, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ManageSalon;
