import React, { useState } from 'react';
import { Button, Alert, CircularProgress, Box } from '@mui/material';
import { Storefront } from '@mui/icons-material';
import { requestSalonOwner } from '../AllServices/Authservice';
import { useauth } from '../Context/AuthContext';

const BecomeSalonOwnerButton = () => {
  const { user } = useauth();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    if (!user?.email) {
      setError('You must be logged in to request this.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await requestSalonOwner(user.email);
      console.log('Salon owner request response:', response);
      setSuccess(true);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        'Failed to submit request. Please try again.';
      setError(typeof msg === 'string' ? msg : 'Failed to submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  // don't show the button at all if they're already a salon owner
  if (user?.role === 'SALON_OWNER') {
    return null;
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success ? (
        <Alert severity="success">
          Request submitted. Awaiting admin approval.
        </Alert>
      ) : (
        <Button
          variant="contained"
          startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <Storefront />}
          disabled={submitting}
          onClick={handleClick}
          sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
        >
          {submitting ? 'Submitting...' : 'Become Salon Owner'}
        </Button>
      )}
    </Box>
  );
};

export default BecomeSalonOwnerButton;