import { useSelector } from "react-redux";
import Button from "../Components/Button";
import { Form, Formik } from "formik";
import useSignup from "../Hooks/useSignup";
import { signupValidation } from "../../util/Validation";

import InputForm from "../components/InputForm";

function Signup() {
  const users = useSelector((s) => s.users);
  console.log(users);

  const signUpUser = useSignup();

  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };

  const handleSubmit = (value) => {
    console.log("hi");
    signUpUser(value);
  };

  return (
    <div className=" w-full h-screen flex flex-col  items-center mt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={signupValidation}
        onSubmit={handleSubmit}
      >
        <Form className=" w-1/2 h-screen  flex flex-col  items-center  ">
          <div className="w-full min-h-80 drop-shadow-2xl bg-blue-50 flex flex-col gap-4 items-center justify-center">
            <h1 className="font-bold text-lg">Signup</h1>
            <div className="space-y-3">
              <InputForm label="Username" type="string" name="userName" />
              <InputForm label="Email" type="email" name="email" />
              <InputForm label="Password" type="password" name="password" />
              <Button type="submit">Signup</Button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
