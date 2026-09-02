import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  getServices,
  createService,
} from "../AllServices/ServicesService";

const serviceCTX = createContext(null);

export function ServiceProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =====================================================
  // GET SERVICES BY SALON
  // =====================================================
  const fetchServicesBySalon = useCallback(async (salonId) => {
    if (!salonId) {
      console.warn("Salon ID is missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getServices(salonId);

      console.log("Services API response:", data);

      // Sometimes API may return an object instead of array.
      // Keep only the array in state.
      if (Array.isArray(data)) {
        setServices(data);
      } else if (Array.isArray(data?.data)) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);

      setError(err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // CREATE SERVICE
  // =====================================================
  const addService = async (serviceData) => {
    try {
      const newService = await createService(serviceData);

      console.log("Created service:", newService);

      // Add newly created service to UI
      setServices((prev) => [...prev, newService]);

      return newService;
    } catch (error) {
      console.error("Failed to create service:", error);

      throw error;
    }
  };

  // =====================================================
  // CONTEXT VALUE
  // =====================================================
  const value = {
    services,
    loading,
    error,
    fetchServicesBySalon,
    addService,
  };

  return (
    <serviceCTX.Provider value={value}>
      {children}
    </serviceCTX.Provider>
  );
}

// =====================================================
// CUSTOM HOOK
// =====================================================
export function useService() {
  const ctx = useContext(serviceCTX);

  if (!ctx) {
    throw new Error(
      "useService must be used inside ServiceProvider"
    );
  }

  return ctx;
}