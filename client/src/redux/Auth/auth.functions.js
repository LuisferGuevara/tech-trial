import { API } from "../../utils/services/api";

export const postUser = async (data, navigate, dispatch) => {
  try {
    const result = await API.post("/users/register", data);
    dispatch({ type: "registerUser", payload: result.data });
    navigate("/login");
  } catch (error) {
    dispatch({ type: "registerError", payload: error.message });
  }
};

export const loginUser = async (data, navigate, dispatch) => {
  try {
    const result = await API.post("/users/login", data);
    dispatch({ type: "loginUser", payload: result.data });
    localStorage.setItem("token", result.data.token);
    navigate("/userProfile");
  } catch (error) {
    dispatch({ type: "loginError", payload: error.response.data });
  }
};

export const logoutUser = (navigate, dispatch) => {
  try {
    dispatch({ type: "logoutUser" });
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/");
  } catch (error) {
    dispatch({ type: "logoutError", payload: error.message });
  }
};

export const putUser = async (data, dispatch, id, setEdit) => {
  try {
    const result = await API.put(`users/edit/${id}`, data);
    dispatch({ type: "putUser", payload: result.data });
    setEdit(false);
  } catch (error) {
    dispatch({ type: "putUser", payload: error.message });
  }
};

export const deleteUser = async (id, dispatch) => {
  try {
    await API.delete(`users/delete/${id}`);
    dispatch({ type: "deleteUser", payload: id });
  } catch (error) {
    dispatch({ type: "deleteUserError", payload: error.message });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const result = await API.get(`users/getAllUsers`);
    console.log("usuario del db:", result.data);
    dispatch({ type: "getAllUsers", payload: result.data });
  } catch (error) {
    dispatch({ type: "getAllUsersError", payload: error.message });
  }
};

export const checkSession = async (token, navigate, dispatch) => {
  const result = await API.post("users/checksession");
  dispatch({ type: "userChecksession", payload: result.data });
  localStorage.setItem("token", token);
};
