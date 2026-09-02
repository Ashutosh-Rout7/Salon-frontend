import {createContext,useContext,useEffect,useState,useCallback,} from "react";
import {getSalon,getSalonById,} from "../AllServices/Salonservice";
import { useauth } from "./AuthContext";

const salonCtx = createContext(null);

export function SalonProvider({ children }) {

  const { user,
    salon: authSalon,
    salonId: authSalonId,
    isSalonOwner,
    loading: authLoading,
  } = useauth();


  const [salon, setSalon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mySalon, setMySalon] = useState(null);
  const [mySalonLoading, setMySalonLoading] = useState(true);
  const [mySalonError, setMySalonError] = useState(null);
  const [salonDetail, setSalonDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {

    const fetchAllSalons = async () => {

      setLoading(true);
      setError(null);

      try {

        const data = await getSalon();

        console.log(
          "SalonContext - all salons:",
          data
        );

        setSalon(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(
          "SalonContext - failed to fetch salons:",
          err.response?.data || err.message
        );

        setError(err);

        setSalon([]);

      } finally {

        setLoading(false);

      }
    };

    fetchAllSalons();

  }, []);


  useEffect(() => {

    console.log(
      "SalonContext auth state:",
      {
        user,
        authSalon,
        authSalonId,
        isSalonOwner,
        authLoading,
      }
    );


    // --------------------------------------------------
    // WAIT FOR AUTH
    // --------------------------------------------------

    if (authLoading) {

      setMySalonLoading(true);

      return;
    }


    // --------------------------------------------------
    // NO USER
    // --------------------------------------------------

    if (!user) {

      console.log(
        "SalonContext: no logged-in user"
      );

      setMySalon(null);
      setMySalonLoading(false);
      setMySalonError(null);

      return;
    }


    // --------------------------------------------------
    // NOT SALON OWNER
    // --------------------------------------------------

    if (!isSalonOwner) {

      console.log(
        "SalonContext: user is not a salon owner"
      );

      setMySalon(null);
      setMySalonLoading(false);
      setMySalonError(null);

      return;
    }

    if (authSalon && authSalon.id) {

      console.log(
        "SalonContext: owner's salon received from AuthContext:",
        authSalon
      );

      console.log(
        "SalonContext: owner's salon ID:",
        authSalon.id
      );

      setMySalon(authSalon);

      setMySalonError(null);

      setMySalonLoading(false);

      // Keep localStorage synchronized
      localStorage.setItem(
        "salonId",
        String(authSalon.id)
      );

      return;
    }

    console.warn(
      "SalonContext: salon owner does not have a salon"
    );

    setMySalon(null);

    setMySalonError(null);

    setMySalonLoading(false);

    localStorage.removeItem("salonId");

  }, [
    user,
    authSalon,
    authSalonId,
    isSalonOwner,
    authLoading,
  ]);

  const salonId =
    mySalon?.id ??
    authSalonId ??
    null;
  useEffect(() => {

    console.log(
      "SalonContext - FINAL salon:",
      mySalon
    );

    console.log(
      "SalonContext - FINAL salonId:",
      salonId
    );

  }, [
    mySalon,
    salonId,
  ]);

  const fetchSalonById = useCallback(
    async (id) => {

      if (!id) {

        console.warn(
          "fetchSalonById: salon ID is required"
        );

        return;
      }

      setDetailLoading(true);

      setDetailError(null);

      try {

        const data =
          await getSalonById(id);

        console.log(
          "Salon details:",
          data
        );

        setSalonDetail(data);

      } catch (err) {

        console.error(
          "Failed to fetch salon details:",
          err.response?.data || err.message
        );

        setDetailError(err);

        setSalonDetail(null);

      } finally {

        setDetailLoading(false);

      }
    },
    []
  );

  const value = {
    salon,
    loading,
    error,
    mySalon,
    salonId,
    mySalonLoading,
    mySalonError,
    salonDetail,
    detailLoading,
    detailError,
    fetchSalonById,
  };


  return (
    <salonCtx.Provider value={value}>
      {children}
    </salonCtx.Provider>
  );
}

export function useSalon() {

  const ctx = useContext(salonCtx);

  if (!ctx) {

    throw new Error(
      "useSalon must be used inside SalonProvider"
    );

  }

  return ctx;
}