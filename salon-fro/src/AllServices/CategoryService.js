import axios from "axios";

const BASE_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
});

// Automatically attach JWT
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

// ===============================
// CREATE CATEGORY
// ===============================
export const createCategory = async (categoryData) => {
  try {
    const response = await API.post(
      "/api/categories/salon-owner",
      categoryData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Create category error:",
      error.response?.data || error.message
    );

    // VERY IMPORTANT
    throw error;
  }
};

// ===============================
// GET ALL CATEGORIES
// ===============================
export const getCategories = async () => {
  try {
    const response = await API.get("/api/categories");

    return response.data;
  } catch (error) {
    console.error(
      "Get categories error:",
      error.response?.data || error.message
    );

    // VERY IMPORTANT
    throw error;
  }
};