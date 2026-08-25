import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";

const BookingCard = () => {

  return (
    <div className="p-5 rounded-md bg-slate-100 md:flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Monika Salon</h1>
        <div>
            <li>Hair cut</li>
            <li>Massage therapy</li>
            <li>Hair colour</li>
        </div>
        <div>
          <p className="font-semibold">
            Time & Date <ArrowRightAltIcon /> 2026-08-01
          </p>
          <p className="text-slate-700">
            12:00:00 To 12:45:00
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <img className="h-28 w-28" src="http://res.cloudinary.com/dxoqwusir/image/upload/v1732934724/barber-2165745_1280_qfqyus.jpg" alt="" />
        <p className="text-center">₹249</p>
        <Button
          color="error"
          fullWidth
          variant="outlined"
        >
            Cancelled
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;
