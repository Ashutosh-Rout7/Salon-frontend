import { createContext, useContext, useEffect, useState } from "react";
import { getCategories, createCategory } from '../AllServices/CategoryService';

const categoryCTX = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // helper: get categories belonging to a specific salon
  const getCategoriesBySalonId = (salonId) => {
    return categories.filter((cat) => cat.salonId === Number(salonId));
  };

  // add a new category (e.g. from salon-owner "create category" form)
  const addCategory = async (categoryData) => {
    const newCategory = await createCategory(categoryData);
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  const value = {
    categories,
    loading,
    error,
    getCategoriesBySalonId,
    addCategory,
  };

  return <categoryCTX.Provider value={value}>{children}</categoryCTX.Provider>;
}

export function useCategory() {
  const ctx = useContext(categoryCTX);
  if (!ctx) {
    throw new Error("useCategory must be used inside CategoryProvider");
  }
  return ctx;
}