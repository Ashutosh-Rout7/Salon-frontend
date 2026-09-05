import React from 'react';
import {
  Container, Box, Typography, Card, CardContent, Grid, Avatar,
  CircularProgress, Alert, Chip, Divider,
} from '@mui/material';
import { Storefront, LocationOn, Email, Phone, AccessTime } from '@mui/icons-material';
import { useSalon } from '../../Context/SalonContext';

const ManageSalons = () => {
  const { salon, loading, error } = useSalon();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
          Manage Salons
        </Typography>
        <Typography variant="body1" color="text.secondary">
          All salons registered on the platform.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load salons.
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : salon.length === 0 ? (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 4, textAlign: 'center' }}>
          <Storefront sx={{ fontSize: 48, color: 'text.disabled', mb: 1.5 }} />
          <Typography variant="h6" fontWeight={600}>
            No salons yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Salons will show up here once owners create them.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={2.5}>
          {salon.map((s) => (
            <Grid item xs={12} md={6} key={s.id}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Avatar
                      src={s.images?.[0]}
                      sx={{ bgcolor: 'primary.light', color: 'primary.main' }}
                    >
                      <Storefront />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {s.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {s.city}
                      </Typography>
                    </Box>
                    <Chip label={`ID: ${s.id}`} size="small" variant="outlined" />
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                    <LocationOn color="action" fontSize="small" />
                    <Typography variant="body2">{s.address || '—'}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                    <Email color="action" fontSize="small" />
                    <Typography variant="body2">{s.email || '—'}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                    <Phone color="action" fontSize="small" />
                    <Typography variant="body2">{s.phoneNumber || '—'}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <AccessTime color="action" fontSize="small" />
                    <Typography variant="body2">
                      {s.openTime || '--:--'} - {s.closeTime || '--:--'}
                    </Typography>
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

export default ManageSalons;