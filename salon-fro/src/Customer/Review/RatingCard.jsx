import { LinearProgress, Rating } from '@mui/material'
import React from 'react'

const RatingCard = ({ reviews = [] }) => {
    const totalReviews = reviews.length;
    const avgRating = totalReviews
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    const countByStars = (min, max) =>
        reviews.filter((r) => r.rating >= min && r.rating <= max).length;

    const ratingRows = [
        { label: "Excellent", value: totalReviews ? (countByStars(4.5, 5) / totalReviews) * 100 : 0, count: countByStars(4.5, 5), color: "success" },
        { label: "Very Good", value: totalReviews ? (countByStars(3.5, 4.49) / totalReviews) * 100 : 0, count: countByStars(3.5, 4.49), color: "success" },
        { label: "Good", value: totalReviews ? (countByStars(2.5, 3.49) / totalReviews) * 100 : 0, count: countByStars(2.5, 3.49), barColor: "#885c0a" },
        { label: "Average", value: totalReviews ? (countByStars(1.5, 2.49) / totalReviews) * 100 : 0, count: countByStars(1.5, 2.49), barColor: "#885c0a" },
        { label: "Poor", value: totalReviews ? (countByStars(0, 1.49) / totalReviews) * 100 : 0, count: countByStars(0, 1.49), color: "error" },
    ];

    return (
        <div className="border p-5 rounded-md">
            <div className="flex items-center space-x-3 pb-10">
                <Rating readOnly name='half-rating' value={avgRating} precision={0.5} />
                <p className="opacity-60">{totalReviews} reviews</p>
            </div>

            <div className="space-y-3">
                {ratingRows.map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                        <p className="w-20 shrink-0 whitespace-nowrap">{row.label}</p>
                        <LinearProgress
                            className="flex-1"
                            sx={{
                                bgcolor: "#d0d0d0",
                                borderRadius: 4,
                                height: 7,
                                ...(row.barColor && {
                                    "& .MuiLinearProgress-bar": { bgcolor: row.barColor },
                                }),
                            }}
                            variant="determinate"
                            value={row.value}
                            color={row.color}
                        />
                        <p className="opacity-50 w-12 shrink-0 text-right">{row.count}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RatingCard