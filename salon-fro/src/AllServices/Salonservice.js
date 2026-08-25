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

//post salon
export const createSalon = async (salonData)=>{
     try {
        const response = await API.post(`/api/salons`,salonData);
        return response.data;
     } catch (error) {
        console.log(error);
     }
}

//get salon
 export const getSalon = async ()=>{
     try {
        const response = await API.get(`/api/salons`);
      return response.data;
     } catch (error) {
        console.log(error);
     }
 }


 //update salon
 export const updateSalon =async (salonId,data)=>{
    try {
       const response =await API.put(`/api/salons/${salonId}`,data);
      return response.data;
    } catch (error) {
       console.log(error);
    }
 }

 //get salon by id
 export const getSalonById = async (salonId) => {
  try {
    const response = await API.get(`/api/salons/${salonId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch salon:", error);
    throw error;
  }
};