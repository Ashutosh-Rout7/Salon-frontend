import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, px: 3 }}>
      <Cancel sx={{ fontSize: 64, color: 'warning.main' }} />
      <Typography variant="h5" fontWeight={700}>Payment Cancelled</Typography>
      <Typography color="text.secondary">Your booking was not completed.</Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Back to Home
      </Button>
    </Box>
  );
};

export default PaymentCancel;