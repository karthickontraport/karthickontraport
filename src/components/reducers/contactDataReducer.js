const initialState = {
  loading: false,
  success: false,
  error: null,
  data: [],
};

const contactDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      // Only set loading to true if it's not already true
      return state.loading
        ? state
        : {
            ...state,
            loading: true,
            success: false,
            error: null,
          };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default contactDataReducer;
