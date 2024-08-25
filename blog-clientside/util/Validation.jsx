import * as Yup from "yup";

export const signupValidation = Yup.object().shape({
  userName: Yup.string().required("Required"),
  email: Yup.string().email("Email not valid").required("Email required"),
  password: Yup.string()
    .min(4, "Minimum 4 characters Required")
    .max(10, "Password must not be more than 10 "),
});

export const loginValidation = Yup.object({
  email: Yup.string().email("Email not valid").required("Email required"),
  password: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters Required")
    .max(10, "Password must not be more than 10 "),
});

export const editValidation = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Email not valid").required("Email required"),
});

export const blogValidation = Yup.object({
  title: Yup.string().required("required"),
  description: Yup.string().required("required"),
});
