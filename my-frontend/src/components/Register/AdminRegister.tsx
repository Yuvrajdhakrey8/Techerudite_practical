import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import styles from "./Register.module.css";
import { ArrowBack } from "@mui/icons-material";

// Validation Schema
const adminSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AdminRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Admin Registration Data:", data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <IconButton onClick={() => navigate("/register")}>
            <ArrowBack />
          </IconButton>

          <Typography variant="h5" className={styles.title}>
            Admin Registration
          </Typography>
        </Box>

        <TextField
          label="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          fullWidth
        />
        <TextField
          label="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center", marginTop: 2 }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </Typography>
      </form>
    </div>
  );
};

export default AdminRegister;
