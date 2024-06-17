import { LOGIN, LOGOUT } from "../actions";

const initialState = {
  name: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        name: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        name: null,
      };

    default:
      return state;
  }
};

export default userReducer;
