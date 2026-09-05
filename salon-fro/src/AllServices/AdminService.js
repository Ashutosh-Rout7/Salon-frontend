import axios from 'axios';

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


//get pending salon owner requests
export const getPendingSalonOwnerRequests = async () => {
  try {
    const response = await API.get(`/auth/admin/salon-owner-requests`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//approve a salon owner request
export const approveSalonOwnerRequest = async (requestId) => {
  try {
    const response = await API.post(`/auth/admin/salon-owner-requests/${requestId}/approve`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//reject a salon owner request
export const rejectSalonOwnerRequest = async (requestId) => {
  try {
    const response = await API.post(`/auth/admin/salon-owner-requests/${requestId}/reject`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//get all users
export const getAllUsers = async () => {
  try {
    const response = await API.get(`/api/users`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}