import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider, CircularProgress } from '@mui/material'
import RatingCard from './RatingCard'

const Review = ({ reviews, loading }) => {
  return (
    <div className='pt-10 flex flex-col lg:flex-row gap-20'>
      <section className='w-full md:w-1/2 lg:w-[40%] space-y-2'>
        <h1 className='font-semibold text-lg pb-4'>Review & Rating</h1>
        <RatingCard reviews={reviews} />
      </section>
      <section className='w-full md:w-1/2 lg:w-[60%]'>
        <div className='mt-10'>
          {loading ? (
            <CircularProgress />
          ) : reviews.length === 0 ? (
            <p className="opacity-60">No reviews yet.</p>
          ) : (
            <div className='space-y-5'>
              {reviews.map((item) => (
                <div key={item.id}>
                  <ReviewCard item={item} />
                  <Divider />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Review