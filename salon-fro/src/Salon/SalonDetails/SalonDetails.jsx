import React, { useState, useEffect } from 'react'
import SalonDetail from './SalonDetail';
import { Button, Divider, CircularProgress } from '@mui/material';
import SalonServiceDetails from './SalonServiceDetails';
import Review from '../../Customer/Review/Review';
import CreateReviewForm from '../../Customer/Review/CreateReviewForm';
import { useSalon } from '../../Context/SalonContext';
import { useParams } from 'react-router-dom';
import { getReviewsBySalon } from '../../AllServices/ReivewService';

const tabs = [{ name: "All services" }, { name: "Reviews" }, { name: "Create Review" }];

const SalonDetails = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleActivetab = (tab) => setActiveTab(tab);

  const { id } = useParams();
  const { salonDetail, detailLoading, detailError, fetchSalonById } = useSalon();

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    if (id) fetchSalonById(id);
  }, [id, fetchSalonById]);

  useEffect(() => {
    if (!id) return;
    setReviewsLoading(true);
    getReviewsBySalon(id)
      .then((data) => setReviews(data))
      .catch((err) => console.log(err))
      .finally(() => setReviewsLoading(false));
  }, [id]);

  const addNewReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setActiveTab(tabs[1]); // jump to Reviews tab after submitting
  };

  if (detailLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (detailError || !salonDetail) {
    return (
      <div className="text-center py-10 text-red-500">
        Salon not found.
      </div>
    );
  }

  return (
    <div className='px-5 lg:px-20 '>
      <SalonDetail salon={salonDetail} />
      <div className='space-y-4'>
        <div className='flex gap-2'>
          {tabs.map((tab) => (
            <Button
              key={tab.id || tab.name}
              variant={tab.name === activeTab.name ? "contained" : "outlined"}
              onClick={() => handleActivetab(tab)}
            >
              {tab.name}
            </Button>
          ))}
        </div>
        <div>
          <Divider />
          <div>
            {activeTab.name === "Create Review" ? (
              <div className='flex justify-center'>
                <CreateReviewForm salonId={id} onReviewAdded={addNewReview} />
              </div>
            ) : activeTab.name === "Reviews" ? (
              <Review reviews={reviews} loading={reviewsLoading} />
            ) : (
              <SalonServiceDetails salon={salonDetail} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalonDetails;