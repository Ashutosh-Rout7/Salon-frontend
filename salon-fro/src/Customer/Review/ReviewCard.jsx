import React from "react";
import { Avatar, IconButton, Rating } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";

const ReviewCard = ({ item }) => {
  return (
    <div className="flex justify-between items-start gap-4 py-4">
      <div className="flex gap-4">
        <Avatar
          className="text-white"
          sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
        >
          {item.user?.fullName ? item.user.fullName[0].toUpperCase() : "U"}
        </Avatar>

        <div className="space-y-2">
          <div>
            <p className="font-semibold text-lg">{item.user?.fullName || "Anonymous"}</p>
            <p className="opacity-70 text-sm">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>

          <Rating readOnly name="half-rating" value={item.rating} precision={0.5} />

          <p>{item.reviewText}</p>
        </div>
      </div>

      <IconButton>
        <DeleteIcon sx={{ color: red[700] }} />
      </IconButton>
    </div>
  );
};

export default ReviewCard;