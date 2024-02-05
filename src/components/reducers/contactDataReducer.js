const initialState = {
  loading: false,
  success: false,
  error: null,
  data: [],
  page: 1,
  hasMore: true,
};

const contactDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
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
        data: [...state.data, ...action.payload],
        page: state.page + 1,
        hasMore: action.hasMore,
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
