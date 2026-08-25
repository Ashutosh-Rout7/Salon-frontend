import React from "react";
import { Avatar, IconButton, Rating, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";

const ReviewCard = ({ item }) => {
  return (
    <div className="flex justify-between items-start gap-4 py-4">
      <div className="flex gap-4">
        <Avatar
          className="text-white"
          sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
          src=""
        >
          A
        </Avatar>

        <div className="space-y-2">
          <div>
            <p className="font-semibold text-lg">code with zosh</p>
            <p className="opacity-70 text-sm">2026-12-01 09:51:18</p>
          </div>

          <Rating
            readOnly
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
          />

          <p>This salon is provide great service</p>
        </div>
      </div>

      <IconButton>
        <DeleteIcon sx={{ color: red[700] }} />
      </IconButton>
    </div>
  );
};

export default ReviewCard;