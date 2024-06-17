import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

const initialState = {
  content: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        content: state.content.concat(action.payload),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        content: state.content.filter((book, i) => i !== action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
