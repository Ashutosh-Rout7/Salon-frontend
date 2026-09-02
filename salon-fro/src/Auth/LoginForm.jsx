import React, { useState } from "react";
import {Box,Paper,Typography,TextField, InputAdornment,IconButton,Button, Divider, Link, Stack} from "@mui/material";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LoginApi } from "../AllServices/Authservice";
import { useauth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,Setloading] = useState(false);
  const[message,Setmessage] = useState("");

  const navigate = useNavigate();
  const{loginuser} = useauth();

  const[login,setLogin] = useState({
    email:"",
    password:""
  })
  
  const handleLoginChange=(e)=>{
      const{name,value}=e.target;
       setLogin((prev)=>({...prev,[name]:value}));
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!login.email || !login.password) {
    Setmessage("please enter valid field");
    return;
  }

  Setmessage("");

  try {
    Setloading(true);

    const data = await LoginApi(login);

    await loginuser(data);

    navigate("/");

    setLogin({
      email: "",
      password: ""
    });

  } catch (error) {
    console.log(error);
    Setmessage(
      error.response?.data?.message || "Login failed. Try again."
    );
  } finally {
    Setloading(false);
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
          borderRadius: 3,
          position: "relative",
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <Stack spacing={0.5} sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your details to access your account.
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              name="email"
              onChange={handleLoginChange}
              value={login.email}
              label="Email address"
              type="email"
              placeholder="ashu@gmail.com"
              autoComplete="off"
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
              name="password"
              onChange={handleLoginChange}
              value={login.password}
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

            <Box sx={{ textAlign: "right", mt: -1 }}>
              <Link href="#" underline="hover" variant="body2" color="text.secondary">
                Forgot password?
              </Link>
            </Box>

            {message && (
                      <Typography color="error" variant="body2">
                        {message}
                      </Typography>
                    )}

            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.3, borderRadius: 2 }}>
              Log in
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

       <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          New here?{" "}
          <Link href="/register" underline="hover" fontWeight={600}>
            {
              loading?"processing..":"Create an account"
            }
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm
