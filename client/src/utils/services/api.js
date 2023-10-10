import axios from "axios";

const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: {
    toString() {
      return `Bearer ${localStorage.getItem("token")}`;
    },
  },
};

export const API = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_REACT_APP_BACK_URL,
  headers: APIHeaders,
});
