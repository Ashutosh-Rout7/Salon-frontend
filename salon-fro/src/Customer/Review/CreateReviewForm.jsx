import React, { useState } from "react";
import { TextField, Button, Box, Rating, InputLabel, Typography } from "@mui/material";
import { createReview} from '../../AllServices/ReivewService';

const CreateReviewForm = ({ salonId, onReviewAdded }) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reviewText.trim().length < 10) {
      setError("Review must be at least 10 characters long");
      return;
    }
    if (reviewRating === 0) {
      setError("Please select a rating");
      return;
    }

    setError("");
    try {
      setLoading(true);
      const newReview = await createReview(salonId, { reviewText, reviewRating });
      setReviewText("");
      setReviewRating(0);
      if (onReviewAdded) onReviewAdded(newReview);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 3 }}
      className="space-y-5 w-full lg:w-1/2"
    >
      <TextField
        fullWidth
        id="reviewText"
        name="reviewText"
        label="Review Text"
        variant="outlined"
        multiline
        rows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <div className="space-y-2">
        <InputLabel>Rating</InputLabel>
        <Rating
          id="reviewRating"
          name="reviewRating"
          value={reviewRating}
          onChange={(event, newValue) => setReviewRating(newValue)}
          precision={0.5}
        />
      </div>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button color="primary" variant="contained" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </Box>
  );
};

export default CreateReviewForm;