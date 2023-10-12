import { API } from "../../utils/services/api";

export const postUser = async (data,  dispatch) => {
  try {
    const result = await API.post("/users/register", data);
    dispatch({ type: "registerUser", payload: result.data });
  } catch (error) {
    dispatch({ type: "registerError", payload: error.response.data });
  }
};

export const loginUser = async (data, navigate, dispatch) => {
  try {
    const result = await API.post("/users/login", data);
    dispatch({ type: "loginUser", payload: result.data });
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.userDb));
    navigate("/userProfile");
  } catch (error) {
    dispatch({ type: "loginError", payload: error.response.data });
  }
};

export const logoutUser = (navigate, dispatch) => {
  try {
    dispatch({ type: "logoutUser" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    dispatch({ type: "putUsereError", payload: error.message });
  }
};
export const putUsers = async (data, dispatch, id, setEdit) => {
  try {
    await API.put(`users/edit/${id}`, data);
    const result = await API.get(`users/getAllUsers`);
    dispatch({ type: "putUsers", payload: result.data });
    setEdit(false);
  } catch (error) {
    dispatch({ type: "putUsersErro", payload: error.message });
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
    dispatch({ type: "getAllUsers", payload: result.data });
  } catch (error) {
    dispatch({ type: "getAllUsersError", payload: error.message });
  }
};

export const checkSession = async (token, dispatch) => {
  try {
    const result = await API.post("users/checksession");
    dispatch({ type: "userChecksession", payload: result.data });
    localStorage.setItem("user", JSON.stringify(result.data.userDb));
    localStorage.setItem("token", token);
  } catch (error) {
    dispatch({ type: "userChecksessionError", payload: error.message });
  }
};
