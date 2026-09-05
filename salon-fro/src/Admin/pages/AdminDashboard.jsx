import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { getPendingSalonOwnerRequests } from '../../AllServices/AdminService';

const AdminDashboard = () => {
  const [pendingCount, setPendingCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPendingSalonOwnerRequests()
      .then((data) => setPendingCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setPendingCount(0))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your platform.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary">Pending Requests</Typography>
              <Typography variant="h3" fontWeight={700}>
                {loading ? <CircularProgress size={28} /> : pendingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;