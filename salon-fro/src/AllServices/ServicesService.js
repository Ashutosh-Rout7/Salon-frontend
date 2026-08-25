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

//post service
export const createService = async (serviceData)=>{
     try {
        const response = await API.post(`/api/service-offering/salon-owner`,serviceData);
        return response.data;
     } catch (error) {
        console.log(error);
     }
}


// get services by salon
export const getServices = async (salonId) => {
  try {
    const response = await API.get(`/api/service-offering/salon/${salonId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw error;
  }
};