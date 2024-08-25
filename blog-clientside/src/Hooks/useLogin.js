import { useDispatch } from "react-redux";
import Instance from "../Api/axios";
import { login } from "../Redux/Features/UserSlice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (value) => {
    try {
      const { data, status } = await Instance.post("/auth/login", value);
      console.log(data);
      if (status === 200) {
        console.log(data);
        dispatch(login({ user: data.user, token: data.token }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return loginUser;
};

export default useLogin;
