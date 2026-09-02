import { createContext, useContext, useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
} from "../AllServices/CategoryService";

import { useauth } from "./AuthContext";

const categoryCTX = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useauth();

  // =====================================
  // GET CATEGORIES
  // =====================================
  useEffect(() => {
    const fetchCategories = async () => {
      // Don't call API if user is not logged in
      if (!user) {
        setCategories([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getCategories();

        console.log("Categories from API:", data);

        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user]);

  // =====================================
  // GET CATEGORIES BY SALON
  // =====================================
  const getCategoriesBySalonId = (salonId) => {
    if (!salonId) {
      return [];
    }

    return categories.filter(
      (category) => Number(category.salonId) === Number(salonId)
    );
  };

  // =====================================
  // CREATE CATEGORY
  // =====================================
  const addCategory = async (categoryData) => {
    try {
      setError(null);

      const newCategory = await createCategory(categoryData);

      console.log("Created category:", newCategory);

      // Add new category immediately to UI
      setCategories((prev) => [...prev, newCategory]);

      return newCategory;
    } catch (err) {
      console.error("Failed to create category:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create category"
      );

      throw err;
    }
  };

  const value = {
    categories,
    loading,
    error,
    getCategoriesBySalonId,
    addCategory,
  };

  return (
    <categoryCTX.Provider value={value}>
      {children}
    </categoryCTX.Provider>
  );
}

export function useCategory() {
  const ctx = useContext(categoryCTX);

  if (!ctx) {
    throw new Error(
      "useCategory must be used inside CategoryProvider"
    );
  }

  return ctx;
}