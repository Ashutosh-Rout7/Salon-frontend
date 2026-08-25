import { createContext, useContext, useEffect, useState } from "react";
import { getuserProfile } from "../AllServices/Authservice";

//create store
const authCTX = createContext();

//create provider
 export function AuthProvider({children}){
    
  const[user,setUser] = useState(null);
  const[loading,setLoading] = useState(false);

  //restore session on page,if token exists
   useEffect(()=>{
     const token =  localStorage.getItem("token");
      if(!token){
        setLoading(false);
        return;
      }
        getuserProfile()
          .then((data)=>setUser(data))
          .catch(()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
          })
          .finally(()=>setLoading(false));
   },[]);

   //login
     const loginuser = async(data)=>{
        localStorage.setItem("token",data.jwt);
        localStorage.setItem("refresh_token",data.refresh_token);

        //get actual profile
        const profile = await getuserProfile();
        setUser(profile);
     };

     //logout
     const logout =()=>{
       setUser(null);
       localStorage.removeItem("token");
       localStorage.removeItem("refresh_token");
     };

    const value={
        user,
        loginuser,
        logout,
        loading
    }

    return(
      <authCTX.Provider value={value}>
        {children}
      </authCTX.Provider>
    );
 }

export function useauth(){
    const ctx = useContext(authCTX);

    if(!ctx){
        throw new Error("Authprovider not found");
    }
    return ctx;
 }