import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  Divider,
} from "@mui/material";

import {
  Storefront,
  CalendarMonth,
  CurrencyRupee,
  People,
  LocationOn,
  AccessTime,
  Edit,
  Add,
} from "@mui/icons-material";

const SalonHome = () => {
  // Static/Fake Data
  const salonData = {
    name: "Royal Touch Beauty Salon",
    ownerName: "Ashutosh Rout",
    city: "Cuttack",
    address: "Near Badambadi Bus Stand, Cuttack",
    openTime: "09:30",
    closeTime: "20:30",
    totalBookings: 128,
    todayBookings: 12,
    totalRevenue: 45680,
    totalCustomers: 84,
    status: "Open",
  };

  const recentBookings = [
    {
      id: 1,
      customerName: "Rahul Sharma",
      service: "Hair Cut",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      customerName: "Priya Das",
      service: "Facial",
      time: "11:30 AM",
      status: "Completed",
    },
    {
      id: 3,
      customerName: "Amit Kumar",
      service: "Hair Spa",
      time: "01:00 PM",
      status: "Confirmed",
    },
    {
      id: 4,
      customerName: "Sneha Patel",
      service: "Manicure",
      time: "03:30 PM",
      status: "Pending",
    },
  ];

  const stats = [
    {
      title: "Today's Bookings",
      value: salonData.todayBookings,
      icon: <CalendarMonth />,
    },
    {
      title: "Total Bookings",
      value: salonData.totalBookings,
      icon: <Storefront />,
    },
    {
      title: "Total Revenue",
      value: `₹${salonData.totalRevenue.toLocaleString()}`,
      icon: <CurrencyRupee />,
    },
    {
      title: "Total Customers",
      value: salonData.totalCustomers,
      icon: <People />,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f7f8fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Salon Dashboard
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Welcome back! Here's what's happening with your salon.
          </Typography>
        </Box>
      </Box>

      {/* Salon Information */}
      <Card
        sx={{
          borderRadius: 3,
          mb: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar
                sx={{
                  width: 65,
                  height: 65,
                  bgcolor: "primary.main",
                }}
              >
                <Storefront sx={{ fontSize: 32 }} />
              </Avatar>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="h5" fontWeight={700}>
                    {salonData.name}
                  </Typography>

                  <Chip
                    label={salonData.status}
                    color="success"
                    size="small"
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Owner: {salonData.ownerName}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationOn fontSize="small" color="action" />

                    <Typography variant="body2" color="text.secondary">
                      {salonData.city}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTime fontSize="small" color="action" />

                    <Typography variant="body2" color="text.secondary">
                      {salonData.openTime} - {salonData.closeTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Button
              variant="outlined"
              startIcon={<Edit />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Edit Salon
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {stat.title}
                    </Typography>

                    <Typography variant="h4" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </Box>

                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "primary.light",
                      color: "primary.main",
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        {/* Recent Bookings */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Recent Bookings
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Latest appointments at your salon
                  </Typography>
                </Box>

                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                  }}
                >
                  View All
                </Button>
              </Box>

              <Divider />

              {recentBookings.map((booking) => (
                <Box key={booking.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 2,
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <Avatar>
                        {booking.customerName.charAt(0)}
                      </Avatar>

                      <Box>
                        <Typography fontWeight={600}>
                          {booking.customerName}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {booking.service}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {booking.time}
                      </Typography>

                      <Chip
                        label={booking.status}
                        size="small"
                        color={
                          booking.status === "Completed"
                            ? "success"
                            : booking.status === "Pending"
                            ? "warning"
                            : "primary"
                        }
                      />
                    </Box>
                  </Box>

                  <Divider />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Information */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700}>
                Salon Information
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Your salon details
              </Typography>

              <Divider sx={{ mb: 2.5 }} />

              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" color="text.secondary">
                  ADDRESS
                </Typography>

                <Typography sx={{ mt: 0.5 }}>
                  {salonData.address}
                </Typography>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" color="text.secondary">
                  CITY
                </Typography>

                <Typography sx={{ mt: 0.5 }}>
                  {salonData.city}
                </Typography>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" color="text.secondary">
                  WORKING HOURS
                </Typography>

                <Typography sx={{ mt: 0.5 }}>
                  {salonData.openTime} - {salonData.closeTime}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Edit />}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Manage Salon
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalonHome;