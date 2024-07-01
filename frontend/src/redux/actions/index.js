export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

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
