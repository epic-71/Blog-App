import { useDispatch } from "react-redux";
import { logout } from "../Redux/Features/UserSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout);
    navigate("/login");
  };
  return (
    <header className="bg-gray-700 text-white  flex justify-between p-3">
      <h1>Blog App</h1>
      <button
        className="bg-blue-500 p-2  px-5 rounded-full "
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}

export default Header;
