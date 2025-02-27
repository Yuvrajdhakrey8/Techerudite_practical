import { useTheme } from "@mui/styles";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginFormValues, LoginInputs, loginSchema } from "./const";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Login.module.css";
import { Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const theme = useTheme();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    const { email, password } = values;
    console.log("🚀 ~ onSubmit ~ values:", values);
    // login({
    //   EMAIL,
    //   password,
    // })
    //   .then((res: any) => {
    //     const { success, accessToken, data, refreshToken, msg } = res as any;
    //     setLoading(false);
    //     if (!success) {
    //       throw new Error(msg);
    //     }
    //     if (data) {
    //       localStorage.setItem("accessToken", accessToken);
    //       localStorage.setItem("refreshToken", refreshToken);
    //       localStorage.setItem("agent", JSON.stringify(data));
    //       navigate("/dashboard");
    //     }
    //   })
    //   .catch((err: Error) => {
    //     toast.error(err?.message);
    //   });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.title}>Login</p>
        {/* <p>Email</p> */}
        <TextField
          {...register(LoginInputs.EMAIL)}
          placeholder="Enter email"
          label="Email"
          fullWidth
          error={!!errors[LoginInputs.EMAIL]}
          helperText={errors[LoginInputs.EMAIL]?.message}
        ></TextField>

        {/* <p>Password</p> */}
        <TextField
          {...register(LoginInputs.PASSWORD)}
          placeholder="Password"
          label="Password"
          type="password"
          fullWidth
          error={!!errors[LoginInputs.PASSWORD]}
          helperText={errors[LoginInputs.PASSWORD]?.message}
        />
        <Button type="submit" variant="contained" loading={loading}>
          Login
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
