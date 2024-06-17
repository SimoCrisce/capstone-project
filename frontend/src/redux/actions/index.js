export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const loginAction = (inputValue) => {
  return {
    type: LOGIN,
    payload: inputValue,
  };
};

export const logoutAction = () => {
  return {
    type: LOGIN,
    payload: null,
  };
};

export const addToCartAction = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCartAction = (i) => {
  return {
    type: REMOVE_FROM_CART,
    payload: i,
  };
};
