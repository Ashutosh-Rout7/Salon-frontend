import React from 'react'

const SalonDetail = ({ salon }) => {
  if (!salon) return null;

  return (
    <div className='space-y-5 mb-20 '>
      <section className='grid grid-cols-2 gap-3'>
        <div className='col-span-2'>
          <img 
            className='w-full rounded-md h-[15rem] object-cover' 
            src="http://res.cloudinary.com/dxoqwusir/image/upload/v1732934194/barber-1453064_1280_o1vfee.jpg" 
            alt="" 
          />
        </div>

        <div className='col-span-1'>
          <img 
            className='w-full rounded-md h-[15rem] object-cover' 
            src="http://res.cloudinary.com/dxoqwusir/image/upload/v1732934203/barber-5497152_1280_zgcao8.jpg" 
            alt="" 
          />
        </div>

        <div className='col-span-1'>
          <img 
            className='w-full rounded-md h-[15rem] object-cover' 
            src="http://res.cloudinary.com/dxoqwusir/image/upload/v1732934217/beauty-salon-4043096_1280_itrjdr.jpg" 
            alt="" 
          />
        </div>
      </section>

      <section className='space-y-3'>
        <h1 className='font-bold text-3xl'>{salon.name}</h1>
        <p>{salon.address}</p>
        <p>
            <strong>
               Timing:
            </strong>
           {salon.openTime} To {salon.closeTime}
        </p>
      </section>
    </div>
  )
}

export default SalonDetail