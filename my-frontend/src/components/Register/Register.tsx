import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { Button, Typography } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Typography variant="h5" className={styles.title}>
          Register
        </Typography>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/register/customer")}
          >
            Customer Registration
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/register/admin")}
          >
            Admin Registration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
