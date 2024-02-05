import axios from "axios";

const API_BASE_URL = "https://www.goleads.com/capsapi/";

export const fetchData = () => async (dispatch) => {
  dispatch({ type: "FETCH_REQUEST" });

  const access_token = localStorage.getItem("accessToken");

  if (!access_token) {
    dispatch({
      type: "FETCH_ERROR",
      payload: "Access token not found. Please log in to the website.",
    });
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}api/client/lists`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });

    let temp = response.data;
    dispatch({
      type: "FETCH_SUCCESS",
      payload: temp,
    });

    console.log(temp);
  } catch (error) {
    console.error("Fetch Error:", error);
    dispatch({
      type: "FETCH_ERROR",
      payload: error.message,
    });
  }
};
