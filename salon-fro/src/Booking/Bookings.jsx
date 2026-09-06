import React, { useEffect, useState } from 'react'
import BookingCard from './BookingCard'
import { getMyBookings } from '../AllServices/Bookingservice'
import { CircularProgress, Alert } from '@mui/material'

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyBookings()
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setError('Failed to load bookings.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='px-5 md:flex flex-col items-center mt-10 min-h-screen'>
      <div>
        <h1 className='text-3xl font-bold py-5'>My Bookings</h1>
      </div>

      <div className='space-y-4 md:w-[35rem]'>
        {loading ? (
          <div className='flex justify-center py-10'>
            <CircularProgress />
          </div>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : bookings.length === 0 ? (
          <p className='text-center text-gray-400'>You have no bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </div>
    </div>
  )
}

export default Bookings