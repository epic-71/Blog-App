import Instance from "../Api/axios";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();

  const signupUser = async (value) => {
    try {
      const {status } = await Instance.post("/auth/signup", value);
      if (status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return signupUser;
};

export default useSignup;
