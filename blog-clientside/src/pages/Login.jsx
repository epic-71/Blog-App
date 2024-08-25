import { Form, Formik } from "formik";
import useLogin from "../Hooks/useLogin";
import { loginValidation } from "../../util/Validation";
import InputForm from "../components/InputForm";
import Button from "../Components/Button";

function Login() {
  const loginUser = useLogin();
  const initialValue = {
    email: "",
    password: "",
  };
  const handleSubmit = (value) => {
    loginUser(value);
  };
  return (
    <div className="flex  items-center  w-full h-screen">
      <Formik
        initialValues={initialValue}
        validationSchema={loginValidation}
        onSubmit={handleSubmit}
      >
        <Form className=" w-1/2 h-screen  flex flex-col  items-center  ">
          <div className="w-full min-h-80 drop-shadow-2xl bg-blue-50 flex flex-col gap-4 items-center justify-center">
            <h1 className="font-bold text-lg">Login</h1>
            <div className="space-y-3">
              <InputForm label="Email" type="email" name="email" />
              <InputForm label="Password" type="password" name="password" />
              <Button type="submit">Login</Button>
            </div>
          </div>
        </Form>
      </Formik>
      <div className=" w-1/2 h-screen">
        <img
          className="w-full h-80 object-cover"
          src="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
