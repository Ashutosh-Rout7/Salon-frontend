import React from 'react'

const Banner = () => {
  return (
    <div className='w-full relative h-[80vh]'>
       <video
         className='w-full h-full object-cover'
         muted
         autoPlay
         loop
         playsInline
         src='https://booksy-public.s3.amazonaws.com/horizontal_.webm'
       />

       <div className='absolute inset-0 flex flex-col items-center justify-center text-white z-20 space-y-3 px-5'>
         <h1 className='text-5xl font-bold'>Be your self</h1>
         <p className='text-slate-400 text-2xl text-center font-semibold'>
            Discover and Book Bueaty,Welness near you
        </p>
       <input
        type="text"
        placeholder="Enter text..."
        className="w-72 sm:w-80 md:w-96 lg:w-[430px]
             px-4 py-3 text-sm sm:text-base lg:text-lg
             bg-white/95 border border-gray-300 rounded-xl shadow-md
             text-gray-800 placeholder:text-gray-500 transition-all duration-300
             hover:border-blue-400 hover:shadow-lg
             focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:shadow-xl"
        />
       </div>
    </div>
  )
}

export default Banner