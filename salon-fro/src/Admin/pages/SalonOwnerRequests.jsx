import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Box, Typography, Card, CardContent, Grid, Button,
  Chip, Avatar, CircularProgress, Alert, Divider,
} from '@mui/material';
import { Person, CheckCircle, Cancel, HourglassEmpty } from '@mui/icons-material';

import {
  getPendingSalonOwnerRequests,
  approveSalonOwnerRequest,
  rejectSalonOwnerRequest,
} from '../../AllServices/AdminService';

const SalonOwnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actioningId, setActioningId] = useState(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPendingSalonOwnerRequests();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load pending requests.');
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleApprove = async (id) => {
    setActioningId(id);
    setError(null);
    try {
      await approveSalonOwnerRequest(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to approve request.';
      setError(typeof msg === 'string' ? msg : 'Failed to approve request.');
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (id) => {
    setActioningId(id);
    setError(null);
    try {
      await rejectSalonOwnerRequest(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to reject request.';
      setError(typeof msg === 'string' ? msg : 'Failed to reject request.');
    } finally {
      setActioningId(null);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          Salon Owner Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and approve pending salon owner requests.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : requests.length === 0 ? (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 4, textAlign: 'center' }}>
          <HourglassEmpty sx={{ fontSize: 48, color: 'text.disabled', mb: 1.5 }} />
          <Typography variant="h6" fontWeight={600}>No pending requests</Typography>
          <Typography variant="body2" color="text.secondary">
            New salon owner requests will show up here.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={2.5}>
          {requests.map((req) => {
            const isBusy = actioningId === req.id;
            return (
              <Grid item xs={12} key={req.id}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={700}>
                            {req.user?.fullName || req.user?.username || 'Unknown user'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {req.user?.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip label={req.status} color="warning" size="small" />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">
                      Requested at: {req.requestedAt ? new Date(req.requestedAt).toLocaleString() : '—'}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5 }}>
                      <Button
                        variant="contained" color="success" startIcon={<CheckCircle />}
                        disabled={isBusy} onClick={() => handleApprove(req.id)}
                        sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
                      >
                        {isBusy ? 'Working...' : 'Approve'}
                      </Button>
                      <Button
                        variant="outlined" color="error" startIcon={<Cancel />}
                        disabled={isBusy} onClick={() => handleReject(req.id)}
                        sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
                      >
                        {isBusy ? 'Working...' : 'Reject'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default SalonOwnerRequests;