import { LinearProgress, Rating } from '@mui/material'
import React from 'react'

const ratingRows = [
    { label: "Excellent", value: 40, count: 19259, color: "success" },
    { label: "Very Good", value: 30, count: 19259, color: "success" },
    { label: "Good", value: 25, count: 19259, barColor: "#885c0a" },
    { label: "Average", value: 21, count: 19259, barColor: "#885c0a" },
    { label: "Poor", value: 10, count: 19259, color: "error" },
];

const RatingCard = () => {
    return (
        <div className="border p-5 rounded-md">
            <div className="flex items-center space-x-3 pb-10">
                <Rating
                    readOnly
                    name='half-rating'
                    value={4.6}
                    precision={0.5}
                />

                <p className="opacity-60">45678</p>
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
                                    "& .MuiLinearProgress-bar": {
                                        bgcolor: row.barColor,
                                    },
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
