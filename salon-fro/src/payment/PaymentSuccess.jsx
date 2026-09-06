import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, Alert } from '@mui/material';
import { CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { getPaymentOrderById, proceedPayment } from '../AllServices/Bookingservice';

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('processing'); // processing | success | failed
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        // 1. fetch the PaymentOrder to get its paymentLinkId (Stripe session id)
        const order = await getPaymentOrderById(orderId);

        if (!order?.paymentLinkId) {
          throw new Error('Payment session not found.');
        }

        // 2. paymentId isn't used on the Stripe branch server-side,
        // so any non-empty placeholder works here
        const result = await proceedPayment('stripe-confirmed', order.paymentLinkId);

        setStatus(result ? 'success' : 'failed');

      } catch (err) {
        console.error(err);
        setError('Something went wrong while confirming your payment.');
        setStatus('failed');
      }
    };

    if (orderId) {
      confirmPayment();
    }
  }, [orderId]);

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, px: 3 }}>
      {status === 'processing' && (
        <>
          <CircularProgress size={48} />
          <Typography variant="h6">Confirming your payment...</Typography>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle sx={{ fontSize: 64, color: 'success.main' }} />
          <Typography variant="h5" fontWeight={700}>Payment Successful</Typography>
          <Typography color="text.secondary">Your booking has been confirmed.</Typography>
          <Button variant="contained" onClick={() => navigate('/bookings')} sx={{ mt: 2 }}>
            View My Bookings
          </Button>
        </>
      )}

      {status === 'failed' && (
        <>
          <ErrorIcon sx={{ fontSize: 64, color: 'error.main' }} />
          <Typography variant="h5" fontWeight={700}>Payment Failed</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </>
      )}
    </Box>
  );
};

export default PaymentSuccess;