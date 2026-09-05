import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Card, CardContent, Grid, Avatar,
  CircularProgress, Alert, Chip,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { getAllUsers } from '../../AllServices/AdminService';

const roleColor = (role) => {
  switch (role) {
    case 'ADMIN':
      return 'error';
    case 'SALON_OWNER':
      return 'success';
    case 'CUSTOMER':
    default:
      return 'default';
  }
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          Manage Users
        </Typography>
        <Typography variant="body1" color="text.secondary">
          All registered users on the platform.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : users.length === 0 ? (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 4, textAlign: 'center' }}>
          <Person sx={{ fontSize: 48, color: 'text.disabled', mb: 1.5 }} />
          <Typography variant="h6" fontWeight={600}>No users found</Typography>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {users.map((u) => (
            <Grid item xs={12} md={6} key={u.id}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                      {u.fullName ? u.fullName.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {u.fullName || u.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {u.email}
                      </Typography>
                      {u.phone && (
                        <Typography variant="body2" color="text.secondary">
                          {u.phone}
                        </Typography>
                      )}
                    </Box>
                    <Chip label={u.role} color={roleColor(u.role)} size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ManageUsers;