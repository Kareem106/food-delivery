import * as yup from "yup";

export const logInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});
export const productSchema = yup.object().shape({
  name: yup.string().required("product name is required"),
  description: yup.string().required("product description is required"),
  category: yup.string().required("product category is required"),
  price: yup.number().required("product price is required"),
  image: yup.mixed().required("product image is required"),
});
