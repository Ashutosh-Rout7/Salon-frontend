import axios from 'axios';

const BASE_URL = "http://localhost:5000";

const API = axios.create({
   baseURL:BASE_URL,
});

API.interceptors.request.use((config)=>{
   const token = localStorage.getItem("token");
   if(token){
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

//create reivew
export const createReview = async (salonId, reviewData) => {
  const response = await API.post(`/api/reviews/salon/${salonId}`, reviewData);
  return response.data;
};

//get reivew
export const getReviewsBySalon = async (salonId) => {
  const response = await API.get(`/api/reviews/salon/${salonId}`);
  return response.data;
};