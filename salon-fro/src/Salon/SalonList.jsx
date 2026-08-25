import React from 'react';
import SalonCard from './SalonCard';
import { useSalon } from '../Context/SalonContext';

const SalonList = () => {
  const { salon, loading } = useSalon();

  if (loading) return <p>Loading salons...</p>;
  if (!salon || salon.length === 0) return <p>No salons found.</p>;

  return (
    <div className="flex gap-6 flex-wrap">
      {salon.map((item, index) => (
        <SalonCard key={item.id ?? index} salon={item} />
      ))}
    </div>
  );
};

export default SalonList;