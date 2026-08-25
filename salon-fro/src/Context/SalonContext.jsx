import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getSalon,getSalonById } from "../AllServices/Salonservice";

//create empty box
const salonCtx = createContext();


//create provider
 export function SalonProvider({children}){

    const[salon,setSalon] = useState([]);
    const[loading,setLoading] = useState(true);

    const [salonDetail, setSalonDetail] = useState(null); // single salon for details page
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState(null);
    
  //call get api
     useEffect(()=>{
        getSalon()
        .then((data)=>setSalon(data))
        .finally(()=>setLoading(false));
     },[]);

   
   // fetch a single salon by id
  const fetchSalonById = useCallback(async (id) => {
    setDetailLoading(true);
    setDetailError(null);
    try {
      const data = await getSalonById(id);
      setSalonDetail(data);
    } catch (err) {
      setDetailError(err);
      setSalonDetail(null);
    } finally {
      setDetailLoading(false);
    }
  }, []);

    const value = {
       //all data
       salon,
       loading,

    // single salon detail data
    salonDetail,
    detailLoading,
    detailError,
    fetchSalonById,
    };


    //call post api
    

    return(
     <salonCtx.Provider value={value}>
       {children}
     </salonCtx.Provider>
    );
     
 }


 // Create a custom hook to consume it 
   export function useSalon(){
     const ctx = useContext(salonCtx);

     if(!ctx){
        throw new Error("useSalon must be inside Salonprovider");
     }
     return ctx;
   }