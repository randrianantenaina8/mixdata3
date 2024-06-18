import { useCallback, useContext, useEffect, useState } from "react"
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { AuthContext } from "../Context/Context"
import { useNavigate } from "react-router-dom"
import { Localstorage } from "../service/Localstorage";
import { API_URL } from "@utils/constants";

export const useApplication = () => {
  const [authorized, setAuthorized] = useState("WAITING")
  const navigate = useNavigate()
  const { user, setUser, details, setDetails } = useContext(AuthContext)

  const login = async (payload) => {
    try {
      const apiResponse = await axios.post(
        `${API_URL}/auth/login`,
        payload
      );
      if (!apiResponse.data.data.error) {
        setUser(jwt_decode(apiResponse.data.data.details.accessToken));
        Localstorage().authenticate(jwt_decode(apiResponse.data.data.details.accessToken))
        Localstorage().authenticate({
          ...jwt_decode(apiResponse.data.data.details.accessToken),
          token: apiResponse.data.data.details.accessToken,
          refresh: apiResponse.data.data.details.refreshToken
        })
        return { res: null, error: false }
      }
      return { res: apiResponse.data.data.details, error: true }

    } catch (error) {
      return { res: error, error: true }
    }
  };

  const logout = async () => {
    const token = JSON.parse(Localstorage().isAuth()).refresh
    await axios.post(
      `${API_URL}/auth/logout`,
      { refreshToken: token }
    );
    setUser(null);
    Localstorage().clearAuth()
    navigate("/");
  };

  const loadAuth = useCallback(() => {
    if (user) {
      setAuthorized("AUTHORIZED")
    }

    if (!user) {
      const checkUser = Localstorage().isAuth()

      if (checkUser) {
        axios.post(
          `${API_URL}/auth/refresh`,
          {
            refreshToken: JSON.parse(checkUser).refresh
          }
        ).then((res) => {
          if (res.data.data.error) {
            Localstorage.clearAuth()
            setAuthorized("UNAUTHORIZED")
          } else {
          }
        }).catch((error) => {
          setAuthorized("UNAUTHORIZED")  
        })
        setAuthorized("AUTHORIZED")
        setUser(checkUser)
      } else {
        setAuthorized("UNAUTHORIZED")
      }
    }
  }, [user, setUser])

  useEffect(() => {
    loadAuth()
  }, [loadAuth])

  return {
    user,
    login,
    logout,
    authorized,
    setAuthorized,
    details,
    setDetails
  }
}
