const initialState = {
  token: localStorage.getItem("accessToken") || null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  error: null,
  loading: false,
  success: false,
  groups: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, success: false, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.access_token,
        userInfo: action.payload.userInfo,
        error: null,
        loading: false,
        success: true,
      };
    case "LOGOUT":
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      return {
        ...state,
        token: null,
        userInfo: null,
        error: null,
        loading: false,
        success: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        token: null,
        error: action.payload.error,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default authReducer;
