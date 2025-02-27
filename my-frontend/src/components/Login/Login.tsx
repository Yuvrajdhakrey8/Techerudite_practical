import { useTheme } from "@mui/styles";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginFormValues, LoginInputs, loginSchema } from "./const";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Login.module.css";
import { Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin-login",
        values
      );
      const { success, token, agent, message } = response.data;

      if (!success) {
        throw new Error(message || "Login failed");
      }

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(agent));

      toast.success("Login successful!");
      navigate("/home");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.title}>Login</p>
        <TextField
          {...register(LoginInputs.EMAIL)}
          placeholder="Enter email"
          label="Email"
          fullWidth
          error={!!errors[LoginInputs.EMAIL]}
          helperText={errors[LoginInputs.EMAIL]?.message}
        />

        <TextField
          {...register(LoginInputs.PASSWORD)}
          placeholder="Password"
          label="Password"
          type="password"
          fullWidth
          error={!!errors[LoginInputs.PASSWORD]}
          helperText={errors[LoginInputs.PASSWORD]?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Typography variant="body2" sx={{ marginTop: 2, textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#10a08e", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register now
          </span>
        </Typography>
      </form>
    </div>
  );
};

export default Login;
