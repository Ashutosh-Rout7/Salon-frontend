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

//post category
export const createCategory = async (categoryData)=>{
     try {
        const response = await API.post(`/api/categories/salon-owner`,categoryData);
        return response.data;
     } catch (error) {
        console.log(error);
     }
}

//get categories
 export const getCategories = async ()=>{
     try {
        const response = await API.get(`/api/categories`);
      return response.data;
     } catch (error) {
        console.log(error);
     }
 }