import { useNavigate, useLocation } from "react-router-dom";
import notification from "../utils/notification";
import axios from "axios";

import Loader from "../component/Loader";
import { useEffect, useState } from "react";
import { GlobalUserContext } from "../context/UserContext";

const VerifyEmail = () => {
  const { setUser, setIsLoggedIn, isLoggedIn } = GlobalUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsloading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const dataObj = {
    email: queryParams.get("email"),
    token: queryParams.get("token"),
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post(
        `${"" || import.meta.env.VITE_API_BASE_URL}/api/v1/auth/verify-user`,
        dataObj,
        { withCredentials: true }
      );
      await setIsLoggedIn(true);
      navigate("/home");
      window.location.reload();
    } catch (error) {
      notification({ message: error.response.data.message, status: "error" });
      navigate("/");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);

  if (isLoading) {
    <Loader />;
  }

  return <div className="verify_page"></div>;
};

export default VerifyEmail;
