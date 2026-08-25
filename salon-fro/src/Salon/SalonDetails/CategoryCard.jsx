import React from 'react'

const CategoryCard = ({ handlecategoryClick, selectedCategory, item }) => {
  return (
    <div
      onClick={handlecategoryClick}
      className={`px-3 py-2 cursor-pointer flex gap-2 items-center rounded-md ${
        selectedCategory === item.id ? "bg-green-500 text-white" : ""
      }`}
    >
      <img
        className='w-14 h-14 object-cover rounded-full'
        src='https://www.homesalon.in/subcategory/17036713111653558919.jpg'
        alt={item.name}
      />
      <h1>{item.name}</h1>
    </div>
  )
}

export default CategoryCard