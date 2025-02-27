import * as yup from "yup";

export enum LoginInputs {
  EMAIL = "email",
  PASSWORD = "password",
}

export const loginSchema = yup.object({
  [LoginInputs.EMAIL]: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  [LoginInputs.PASSWORD]: yup.string().required("Password is required"),
});

export interface LoginFormValues {
  [LoginInputs.EMAIL]: string;
  [LoginInputs.PASSWORD]: string;
}

export const passwordRules = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[@$!%*?&]/,
    "Password must contain at least one special character (@, $, !, %, *, ?, &)"
  )
  .required("Password is required");
