import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";

const BookingCard = ({ booking }) => {

  const startDate = booking?.startTime ? new Date(booking.startTime) : null;
  const endDate = booking?.endTime ? new Date(booking.endTime) : null;

  const dateLabel = startDate ? startDate.toLocaleDateString() : '—';
  const timeLabel =
    startDate && endDate
      ? `${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} To ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : '—';

  const isCancelled = booking?.status === 'CANCELLED';

  return (
    <div className="p-5 rounded-md bg-slate-100 md:flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{booking?.salonName || 'Salon'}</h1>
        <div>
          {(booking?.services || []).map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </div>
        <div>
          <p className="font-semibold">
            Time & Date <ArrowRightAltIcon /> {dateLabel}
          </p>
          <p className="text-slate-700">
            {timeLabel}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <img
          className="h-28 w-28 object-cover rounded-md"
          src={booking?.salonImage || "http://res.cloudinary.com/dxoqwusir/image/upload/v1732934724/barber-2165745_1280_qfqyus.jpg"}
          alt=""
        />
        <p className="text-center">₹{booking?.totalPrice ?? '—'}</p>
        <Button
          color="error"
          fullWidth
          variant="outlined"
          disabled={isCancelled}
        >
          {isCancelled ? 'Cancelled' : 'Cancel'}
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;