import axios from "axios";

const BASE_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
});

// ======================================================
// ATTACH JWT AUTOMATICALLY
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
// CREATE SALON
// POST /api/salons
// ======================================================

export const createSalon = async (salonData) => {
  try {
    const response = await API.post(
      "/api/salons",
      salonData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to create salon:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// GET ALL SALONS
// GET /api/salons
// ======================================================

export const getSalon = async () => {
  try {
    const response = await API.get("/api/salons");

    console.log("Salons API response:", response.data);

    /*
     * Depending on your backend, response may be:
     *
     * [
     *   {...},
     *   {...}
     * ]
     *
     * OR
     *
     * {
     *   data: [...]
     * }
     *
     * Handle both.
     */

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.data?.data)) {
      return response.data.data;
    }

    if (Array.isArray(response.data?.salons)) {
      return response.data.salons;
    }

    console.warn(
      "Unexpected salons API response:",
      response.data
    );

    return [];
  } catch (error) {
    console.error(
      "Failed to fetch salons:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// GET MY SALON
//
// The logged-in salon owner does NOT enter salonId.
//
// Example:
//
// Pagal user id = 5
// Pagal's salon id = 3
//
// This function finds salon 3 automatically.
// ======================================================

export const getMySalon = async (userId) => {
  try {
    if (!userId) {
      throw new Error(
        "User ID is required to find salon"
      );
    }

    const salons = await getSalon();

    console.log(
      "Finding salon for user ID:",
      userId
    );

    console.log(
      "Available salons:",
      salons
    );

    const mySalon = salons.find((salon) => {
      /*
       * Depending on your backend response,
       * owner information may be represented differently.
       */

      const ownerId =
        salon.owner?.id ??
        salon.ownerId ??
        salon.user?.id ??
        salon.userId ??
        salon.createdBy?.id ??
        salon.createdById;

      return Number(ownerId) === Number(userId);
    });

    console.log(
      "Salon found for user:",
      mySalon
    );

    return mySalon || null;
  } catch (error) {
    console.error(
      "Failed to find my salon:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// UPDATE SALON
// PUT /api/salons/:salonId
// ======================================================

export const updateSalon = async (
  salonId,
  data
) => {
  try {
    if (!salonId) {
      throw new Error(
        "Salon ID is required to update salon"
      );
    }

    const response = await API.put(
      `/api/salons/${salonId}`,
      data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to update salon:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ======================================================
// GET SALON BY ID
// GET /api/salons/:salonId
// ======================================================

export const getSalonById = async (
  salonId
) => {
  try {
    if (!salonId) {
      throw new Error(
        "Salon ID is required"
      );
    }

    const response = await API.get(
      `/api/salons/${salonId}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch salon:",
      error.response?.data || error.message
    );

    throw error;
  }
};