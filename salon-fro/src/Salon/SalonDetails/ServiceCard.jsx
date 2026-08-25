import React from 'react'
import { FiberManualRecord } from "@mui/icons-material";
import { Button } from '@mui/material';

const ServiceCard = ({ item, selectedServices, setSelectedServices }) => {

  const isSelected = selectedServices.some((s) => s.id === item.id);

  const handleAdd = () => {
    setSelectedServices((prev) => [...prev, item]);
  };

  const handleRemove = () => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== item.id));
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between gap-5'>
        <div className='space-y-1 w-[60%]'>
          <h1 className='text-2xl font-semibold'>{item.name}</h1>
          <p className='text-grey-500 text-sm'>{item.description}</p>
          <div className='flex items-center gap-3'>
            <p>₹{item.price}</p>
            <FiberManualRecord sx={{ fontSize: "10px", color: "gray" }} />
            <p>{item.duration} mins</p>
          </div>
        </div>
        <div className='space-y-3'>
          <img
            className='w-32 h-32 object-cover rounded-md'
            src={item.image}
            alt={item.name}
          />
          {isSelected ? (
            <Button variant='contained' color='error' onClick={handleRemove}>Remove</Button>
          ) : (
            <Button variant='outlined' onClick={handleAdd}>Add</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceCard