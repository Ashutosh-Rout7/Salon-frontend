import axios from "axios";

const BASE_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
});

// ======================================================
// AUTH INTERCEPTOR
// ======================================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ======================================================
// CREATE SERVICE
// ======================================================
//
// IMPORTANT:
//
// salonId is NOT sent from frontend.
//
// The backend gets the logged-in user from JWT
// and determines which salon belongs to that user.
//
// Example request body:
//
// {
//   name: "Haircut",
//   description: "Professional haircut",
//   price: 499,
//   duration: 30,
//   image: "https://example.com/image.jpg",
//   category: 1
// }
//
// Pagal does NOT send:
//
// salonId: 3
//
// Backend determines that automatically.
// ======================================================

export const createService = async (serviceData) => {
  try {
    const response = await API.post(
      "/api/service-offering/salon-owner",
      serviceData
    );

    console.log(
      "Create service response:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Create service failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// GET SERVICES BY SALON
// ======================================================
//
// This endpoint DOES require salonId.
//
// Example:
//
// GET /api/service-offering/salon/3
//
// The frontend will get salonId automatically from
// SalonContext.
//
// Pagal:
//
// user.id = 5
// mySalon.id = 3
// salonId = 3
//
// Then:
//
// GET /api/service-offering/salon/3
// ======================================================

export const getServices = async (salonId) => {
  try {
    if (!salonId) {
      throw new Error(
        "Salon ID is required to fetch services"
      );
    }

    const response = await API.get(
      `/api/service-offering/salon/${salonId}`
    );

    console.log(
      `Services for salon ${salonId}:`,
      response.data
    );

    /*
     * Handle common backend response formats.
     */

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.data?.data)) {
      return response.data.data;
    }

    if (Array.isArray(response.data?.services)) {
      return response.data.services;
    }

    console.warn(
      "Unexpected services API response:",
      response.data
    );

    return [];
  } catch (error) {
    console.error(
      "Get services failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};