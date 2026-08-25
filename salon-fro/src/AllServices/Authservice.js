import axios, { Axios } from 'axios';

const BASE_URL = "http://localhost:5000";

const API = axios.create({
   baseURL:BASE_URL,
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


//register
export const RegisterAPI = async (registerdata)=>{
   try {
      const response = await API.post(`/auth/signup`,registerdata);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

//login
export const LoginApi = async (logindata)=>{
     try {
        const response = await API.post(`/auth/login`,logindata);
        return response.data;
     } catch (error) {
        console.log(error);
        throw error;
     }
}

//get profile
export const getuserProfile = async ()=>{
  try {
    const response = await API.get(`/api/users/profile`);
   return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}