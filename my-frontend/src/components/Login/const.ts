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
