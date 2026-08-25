import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import ServiceCard from './ServiceCard';
import { Button, Divider } from '@mui/material';
import { RemoveShoppingCart, ShoppingCart } from '@mui/icons-material';
import SelectedServiceList from './SelectedServiceList';
import { useCategory } from '../../Context/CategoryContext';
import { useService } from '../../Context/ServicesContext';

const SalonServiceDetails = ({ salon }) => {

  const { getCategoriesBySalonId, loading: categoriesLoading } = useCategory();
  const { services, loading: servicesLoading, fetchServicesBySalon } = useService();

  const categories = salon ? getCategoriesBySalonId(salon.id) : [];

  useEffect(() => {
    if (salon?.id) fetchServicesBySalon(salon.id);
  }, [salon?.id, fetchServicesBySalon]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlecategoryClick = (categoryId) => () => {
    setSelectedCategory(categoryId);
  };

  const filteredServices = selectedCategory
    ? services.filter((s) => s.categoryId === selectedCategory)
    : services;

  const [selectedServices, setSelectedServices] = useState([]);

  return (
    <div className='lg:flex gap-5 h-[90vh] mt-10'>
      <section className='space-y-5 border-r lg:w-[25%] pr-5'>
        {categoriesLoading ? (
          <p className='text-sm text-gray-400'>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className='text-sm text-gray-400'>No categories available.</p>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              item={category}
              handlecategoryClick={handlecategoryClick(category.id)}
              selectedCategory={selectedCategory}
            />
          ))
        )}
      </section>

      <section className='space-y-2 lg:w-[50%] px-5 lg:px-20 overflow-y-auto'>
        {servicesLoading ? (
          <p className='text-sm text-gray-400'>Loading services...</p>
        ) : filteredServices.length === 0 ? (
          <p className='text-sm text-gray-400'>No services available.</p>
        ) : (
          filteredServices.map((service) => (
            <div key={service.id} className='space-y-4'>
              <ServiceCard item={service} selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
              <Divider />
            </div>
          ))
        )}
      </section>

      <section className='lg:w-[25%]'>
        {selectedServices.length > 0 ? (
          <div className='border rounded-md p-5'>
            <div>
              <div className='flex items-center gap-2'>
                <ShoppingCart sx={{ fontSize: "30px", color: "green" }} />
                <h1 className='font-thin text-sm'>Selected services</h1>
              </div>
              <SelectedServiceList selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
              <Button fullWidth variant='contained'>Book Now</Button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3 items-center justify-center border rounded-md p-5'>
            <RemoveShoppingCart sx={{ fontSize: "30px", color: "green" }} />
            <h1>Not selected</h1>
          </div>
        )}
      </section>
    </div>
  )
}

export default SalonServiceDetails