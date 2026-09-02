import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getuserProfile } from "../AllServices/Authservice";
import { getSalon } from "../AllServices/Salonservice";

const authCTX = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
   * Find the salon that belongs to the logged-in user.
   *
   * Your logged-in user:
   * Pagal -> id 5
   *
   * His salon:
   * Salon -> id 3
   */
  const findUserSalon = async (profile) => {
    try {
      const salons = await getSalon();

      console.log("All salons:", salons);
      console.log("Logged-in user:", profile);

      if (!Array.isArray(salons)) {
        console.warn("Salon API did not return an array");
        return null;
      }

      const userSalon = salons.find((item) => {
        const ownerId =
          item.owner?.id ??
          item.ownerId ??
          item.user?.id ??
          item.userId ??
          item.createdBy?.id;

        return Number(ownerId) === Number(profile.id);
      });

      console.log("Salon belonging to logged-in user:", userSalon);

      return userSalon || null;
    } catch (error) {
      console.error(
        "Failed to find user's salon:",
        error.response?.data || error.message
      );

      return null;
    }
  };

  /*
   * Restore login session after page refresh
   */
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role");

      if (!token) {
        setUser(null);
        setSalon(null);
        setLoading(false);
        return;
      }

      try {
        // 1. Get logged-in user
        const profile = await getuserProfile();

        const loggedInUser = {
          ...profile,
          role: savedRole,
        };

        console.log("Restored logged-in user:", loggedInUser);

        setUser(loggedInUser);

        // 2. If salon owner, find his salon
        if (savedRole === "SALON_OWNER") {
          const userSalon = await findUserSalon(profile);

          setSalon(userSalon);

          // Store salon ID for easy access
          if (userSalon?.id) {
            localStorage.setItem(
              "salonId",
              String(userSalon.id)
            );

            console.log(
              "Logged-in owner's salon ID:",
              userSalon.id
            );
          } else {
            localStorage.removeItem("salonId");

            console.warn(
              "No salon found for logged-in salon owner"
            );
          }
        } else {
          setSalon(null);
          localStorage.removeItem("salonId");
        }
      } catch (error) {
        console.error(
          "Failed to restore session:",
          error.response?.data || error.message
        );

        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");
        localStorage.removeItem("salonId");

        setUser(null);
        setSalon(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /*
   * LOGIN
   */
  const loginuser = async (data) => {
    try {
      // Save authentication information
      localStorage.setItem("token", data.jwt);
      localStorage.setItem(
        "refresh_token",
        data.refresh_token
      );
      localStorage.setItem("role", data.role);

      // Get logged-in user's profile
      const profile = await getuserProfile();

      const loggedInUser = {
        ...profile,
        role: data.role,
      };

      console.log("Logged-in user:", loggedInUser);

      setUser(loggedInUser);

      /*
       * If user is salon owner,
       * automatically find the salon created by him.
       */
      if (data.role === "SALON_OWNER") {
        const userSalon = await findUserSalon(profile);

        setSalon(userSalon);

        if (userSalon?.id) {
          localStorage.setItem(
            "salonId",
            String(userSalon.id)
          );

          console.log(
            "Salon owner salon ID:",
            userSalon.id
          );
        } else {
          localStorage.removeItem("salonId");

          console.warn(
            "Salon owner does not have a salon yet"
          );
        }
      } else {
        setSalon(null);
        localStorage.removeItem("salonId");
      }

      return loggedInUser;
    } catch (error) {
      console.error(
        "Login setup failed:",
        error.response?.data || error.message
      );

      // Clean up if login setup fails
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role");
      localStorage.removeItem("salonId");

      setUser(null);
      setSalon(null);

      throw error;
    }
  };

  /*
   * LOGOUT
   */
  const logout = () => {
    setUser(null);
    setSalon(null);

    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("salonId");
  };

  const value = {
    user,
    salon,

    // Very useful for service pages
    salonId: salon?.id ?? null,

    loginuser,
    logout,

    loading,

    isSalonOwner: user?.role === "SALON_OWNER",
  };

  return (
    <authCTX.Provider value={value}>
      {children}
    </authCTX.Provider>
  );
}

export function useauth() {
  const ctx = useContext(authCTX);

  if (!ctx) {
    throw new Error(
      "useauth must be used inside AuthProvider"
    );
  }

  return ctx;
}