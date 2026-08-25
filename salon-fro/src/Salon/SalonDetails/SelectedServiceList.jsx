import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

const SelectedServiceList = ({ selectedServices, setSelectedServices }) => {

  const handleRemove = (id) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className='my-5 space-y-2'>
      {selectedServices.map((item) => (
        <div key={item.id} className='py-2 px-4 rounded-md bg-slate-100 flex justify-between items-center'>
          <h1 className='font-thin'>{item.name}</h1>
          <p>₹{item.price}</p>
          <IconButton onClick={() => handleRemove(item.id)}><Close /></IconButton>
        </div>
      ))}
    </div>
  )
}

export default SelectedServiceList