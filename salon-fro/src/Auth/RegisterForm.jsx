import React, { useState } from "react";
import {Box,Paper,Typography,TextField,InputAdornment,IconButton,Button,Divider,Link,Stack} from "@mui/material";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { RegisterAPI } from "../AllServices/Authservice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  
  const[register,setRegister] = useState({
    fullName:"",
    username: "",
    email:"",
    password:"",
    role: "CUSTOMER", 
  })

  const handleRegisterChange = (e) =>{
      const{name,value} = e.target;
      setRegister((prev)=>({...prev,[name]:value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!register.fullName || !register.username || !register.email || !register.password) {
    setErrorMsg("Please fill in all fields.");
    return;
  }
    
    //call register api
     try {
       setLoading(true);
       await RegisterAPI(register);
       setRegister({
      fullName: "",
      username: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    });
      navigate("/login");
     } catch (error) {
        throw error;
        setErrorMsg(
      error.response?.data?.message || "Registration failed. Try again."
    );
     }
     finally{
       setLoading(false);
     }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* blurred background layer */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 5 },
          borderRadius: 5,
          position: "relative",
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <Stack spacing={0.5} sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            Create your account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in your details to get started.
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              name="fullName"
              onChange={handleRegisterChange}
              value={register.fullName}
              label="Full name"
              type="text"
              placeholder="Ashutosh Rout"
              autoComplete="name"
              fullWidth
              required
             slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={18} color="#757575" />
                  </InputAdornment>
                ),
              },
            }}
            />

            <TextField
              name="email"
              onChange={handleRegisterChange}
              value={register.email}
              label="Email address"
              type="email"
              placeholder="ashu@gmail.com"
              autoComplete="email"
              fullWidth
              required
             slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} color="#757575" />
                  </InputAdornment>
                ),
              },
            }}
            />

           <TextField
            name="username"
            onChange={handleRegisterChange}
            value={register.username}
            label="Username"
            type="text"
            placeholder="ashu"
            autoComplete="username"
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={18} color="#757575" />
                  </InputAdornment>
                ),
              },
            }}
          />
            <TextField
              name="password"
              onChange={handleRegisterChange}
              value={register.password}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              fullWidth
              required
              slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} color="#757575" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            />

        {errorMsg && (
          <Typography color="error" variant="body2">
            {errorMsg}
          </Typography>
        )}

            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.3, borderRadius: 2, mt: 1 }}>
              {
                loading?"Registering...":"Create account"
              }
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="white" sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover" fontWeight={600}>
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterForm
