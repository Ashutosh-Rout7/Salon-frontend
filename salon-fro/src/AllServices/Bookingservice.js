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


//create booking
//POST /api/bookings?salonId=...&paymentMethod=...
export const createBooking = async (salonId, paymentMethod, data) => {
  try {
    const response = await API.post(
      `/api/bookings?salonId=${salonId}&paymentMethod=${paymentMethod}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//get all bookings for logged-in customer
export const getMyBookings = async () => {
  try {
    const response = await API.get(`/api/bookings/customer`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//get payment order by id
export const getPaymentOrderById = async (paymentOrderId) => {
  try {
    const response = await API.get(`/api/payments/${paymentOrderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//confirm payment (PATCH /api/payments/proceed)
export const proceedPayment = async (paymentId, paymentLinkId) => {
  try {
    const response = await API.patch(
      `/api/payments/proceed?paymentId=${encodeURIComponent(paymentId)}&paymentLinkId=${encodeURIComponent(paymentLinkId)}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}