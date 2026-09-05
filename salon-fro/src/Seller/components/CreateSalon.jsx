import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Card, CardContent, Container, Grid, IconButton,
  TextField, Typography, Avatar, Divider, Alert, CircularProgress,
  Backdrop,
} from "@mui/material";
import {
  AddPhotoAlternate, Delete, Storefront, LocationCity, LocationOn,
  Email, Phone, AccessTime, Save,
} from "@mui/icons-material";

import { createSalon } from "../../AllServices/Salonservice";
import { useSalon } from "../../Context/SalonContext";
import { useauth } from "../../Context/AuthContext";

const CreateSalon = () => {
  const navigate = useNavigate();
  const { user, isSalonOwner, loading: authLoading } = useauth();
  const { mySalon, mySalonLoading } = useSalon();

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

  // ------------------------------------------------------
  // GUARD: one owner can only have one salon.
  // If they already have one, send them to manage it instead
  // of showing the create form at all.
  // ------------------------------------------------------
  useEffect(() => {
    if (authLoading || mySalonLoading) return;

    if (!user || !isSalonOwner) {
      navigate("/"); // not a salon owner, shouldn't be here
      return;
    }

    if (mySalon) {
      navigate("/manage-salon"); // already has a salon
    }
  }, [authLoading, mySalonLoading, user, isSalonOwner, mySalon, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageEntries = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), // local preview only
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageEntries],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // basic required-field check before hitting the API
    const required = ["name", "city", "address", "email", "phoneNumber", "openTime", "closeTime"];
    const missing = required.filter((field) => !formData[field]?.trim());
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    setSubmitting(true);

    try {
      // --------------------------------------------------
      // IMPORTANT: your backend expects "images" as an array
      // of URL strings (see your Postman payload), but this
      // form currently holds raw File objects with local
      // blob preview URLs — those blob: URLs are NOT valid
      // once this tab closes, and your backend has no way to
      // receive the actual file bytes here.
      //
      // You need an image upload step BEFORE this call, e.g.:
      //   const uploadedUrls = await uploadImages(formData.images.map(i => i.file));
      //
      // uploadImages() would hit something like a Cloudinary
      // signed-upload endpoint, an S3 presigned URL, or your
      // own /api/upload endpoint, and return real public URLs.
      //
      // Until that exists, this will send blob: URLs, which
      // will save into your DB but WON'T be viewable by anyone
      // outside this browser tab. Replace the line below once
      // you've built that upload service.
      // --------------------------------------------------
      const imageUrls = formData.images.map((img) => img.url);

      const payload = {
        name: formData.name,
        images: imageUrls,
        city: formData.city,
        address: formData.address,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        openTime: formData.openTime,
        closeTime: formData.closeTime,
      };

      await createSalon(payload);

      // success — go to the salon they just created
      navigate("/manage-salon");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to create salon. Please try again.";
      setError(typeof msg === "string" ? msg : "Failed to create salon. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // avoid flashing the form while we're still checking
  // whether this owner already has a salon
  if (authLoading || mySalonLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Backdrop open={submitting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
          Create Salon
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Add a new salon and provide its basic information.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={8}>
            {/* Basic Information */}
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                  <Avatar sx={{ bgcolor: "primary.light", color: "primary.main" }}>
                    <Storefront />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>Basic Information</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enter the salon's basic details.
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth required label="Salon Name" name="name"
                      value={formData.name} onChange={handleChange}
                      placeholder="Royal Touch Beauty Salon"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth required label="City" name="city"
                      value={formData.city} onChange={handleChange}
                      placeholder="Cuttack"
                      InputProps={{ startAdornment: <LocationCity sx={{ mr: 1, color: "text.secondary" }} /> }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth required label="Email" type="email" name="email"
                      value={formData.email} onChange={handleChange}
                      placeholder="royaltouchsalon@example.com"
                      InputProps={{ startAdornment: <Email sx={{ mr: 1, color: "text.secondary" }} /> }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth required label="Address" name="address"
                      value={formData.address} onChange={handleChange}
                      placeholder="Near Badambadi Bus Stand, Cuttack"
                      multiline rows={3}
                      InputProps={{ startAdornment: <LocationOn sx={{ mr: 1, mt: 1, color: "text.secondary" }} /> }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth required label="Phone Number" name="phoneNumber"
                      value={formData.phoneNumber} onChange={handleChange}
                      placeholder="9123456780"
                      InputProps={{ startAdornment: <Phone sx={{ mr: 1, color: "text.secondary" }} /> }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Opening Hours */}
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                  <Avatar sx={{ bgcolor: "primary.light", color: "primary.main" }}>
                    <AccessTime />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>Opening Hours</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Set the salon's opening and closing time.
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth required type="time" label="Opening Time" name="openTime"
                      value={formData.openTime} onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
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

            {/* Images */}
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={0.5}>Salon Images</Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Upload images of the salon. You can add multiple images.
                </Typography>

                <Button
                  component="label" variant="outlined" startIcon={<AddPhotoAlternate />}
                  sx={{ borderRadius: 2, textTransform: "none", mb: 3 }}
                >
                  Add Images
                  <input hidden multiple accept="image/*" type="file" onChange={handleImageChange} />
                </Button>

                {formData.images.length > 0 && (
                  <Grid container spacing={2}>
                    {formData.images.map((image, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Box sx={{ position: "relative", height: 140, borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
                          <Box component="img" src={image.url} alt={`Salon ${index + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <IconButton
                            onClick={() => removeImage(index)} size="small"
                            sx={{ position: "absolute", top: 6, right: 6, bgcolor: "background.paper", "&:hover": { bgcolor: "background.paper" } }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT SIDE - PREVIEW */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, position: "sticky", top: 20 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700}>Salon Preview</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Preview the information before creating the salon.
                </Typography>

                <Divider sx={{ mb: 2.5 }} />

                {formData.images.length > 0 ? (
                  <Box component="img" src={formData.images[0].url} alt="Salon preview" sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 2, mb: 2 }} />
                ) : (
                  <Box sx={{ height: 180, borderRadius: 2, bgcolor: "grey.100", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <AddPhotoAlternate sx={{ fontSize: 45, color: "text.disabled" }} />
                  </Box>
                )}

                <Typography variant="h6" fontWeight={700}>{formData.name || "Salon Name"}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
                  {formData.city || "City"}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                  <LocationOn color="action" fontSize="small" />
                  <Typography variant="body2">{formData.address || "Salon address"}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                  <Email color="action" fontSize="small" />
                  <Typography variant="body2">{formData.email || "Salon email"}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                  <Phone color="action" fontSize="small" />
                  <Typography variant="body2">{formData.phoneNumber || "Phone number"}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <AccessTime color="action" fontSize="small" />
                  <Typography variant="body2">
                    {formData.openTime || "--:--"} - {formData.closeTime || "--:--"}
                  </Typography>
                </Box>

                <Button
                  type="submit" fullWidth variant="contained" size="large"
                  startIcon={<Save />} disabled={submitting}
                  sx={{ mt: 3, py: 1.4, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                >
                  {submitting ? "Creating..." : "Create Salon"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateSalon;