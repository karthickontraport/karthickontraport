import axios from "axios";
const API_BASE_URL = "https://www.b2bvibe.com/capsapi/";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  const bodyFormData = new URLSearchParams();
  bodyFormData.append("Username", email);
  bodyFormData.append("Password", password);
  bodyFormData.append("grant_type", "password");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/login/token`,
      bodyFormData.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token } = response.data;

    const infoResponse = await axios.get(`${API_BASE_URL}/api/login/info`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("userInfo", JSON.stringify(infoResponse.data));

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        access_token,
        userInfo: infoResponse.data,
        success: true,
      },
    });

    console.log("Login success:", access_token);
    console.log("Info response:", infoResponse.data);
  } catch (error) {
    console.error("Login Error:", error);
    dispatch({
      type: "LOGIN_ERROR",
      payload: {
        error: "Login failed & Invalid email or password",
        success: false,
      },
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userInfo");
  dispatch({ type: "LOGOUT" });
};
