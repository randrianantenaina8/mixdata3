
import axios from "axios";
import { Localstorage } from "./Localstorage";
import { API_URL } from "@utils/constants";

const jwtInterceptor = axios.create({});
const auth = Localstorage().isAuth()

jwtInterceptor.interceptors.request.use((config) => {
  if (auth) {
    const authData = JSON.parse(auth).token
    config.headers["x-access-token"] = authData
    return config;
  }
});

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error && error.response && error.response.status === 401) {
      const authData = JSON.parse(auth).refresh
      const payload = {
        refreshToken: authData
      };

      let apiResponse = await axios.post(
       `${API_URL}/auth/refresh`,
        payload
      );
      if (!apiResponse.data.error) {
        localStorage.setItem("tokens", JSON.stringify(apiResponse.data.data.details));
        error.config.headers[
          "x-access-token"
        ] = `${apiResponse.data.accessToken}`;
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }


    } else {
      return Promise.reject(error);
    }
  }
);
export default jwtInterceptor;
