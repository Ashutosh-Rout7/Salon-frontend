import { Card } from "@mui/material";
import React from "react";

const NotificationCard = () => {
  return (
    <Card
      sx={{ bgcolor:"#EAF0F1"  }}
      className={`cursor-pointer p-5 flex items-center gap-5 
      }`}
    >
      🛎️
      <div>
        <p>Your Booking got Confirmed</p>
        <h1 className="space-x-3">
          {
            [1,1,1,1].map((item)=>{
                return <span>Hair cut</span>
            })
          }
        </h1>
      </div>
    </Card>
  );
};

export default NotificationCard;
