import { createContext, useContext, useState, useCallback } from "react";
import { getServices, createService } from '../AllServices/ServicesService';

const serviceCTX = createContext();

export function ServiceProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServicesBySalon = useCallback(async (salonId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices(salonId);
      setServices(data);
    } catch (err) {
      setError(err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addService = async (serviceData) => {
    const newService = await createService(serviceData);
    setServices((prev) => [...prev, newService]);
    return newService;
  };

  const value = {
    services,
    loading,
    error,
    fetchServicesBySalon,
    addService,
  };

  return <serviceCTX.Provider value={value}>{children}</serviceCTX.Provider>;
}

export function useService() {
  const ctx = useContext(serviceCTX);
  if (!ctx) {
    throw new Error("useService must be used inside ServiceProvider");
  }
  return ctx;
}