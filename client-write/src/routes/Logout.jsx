import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useOutletContext();
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }, []);
  return;
};

export default Logout;
