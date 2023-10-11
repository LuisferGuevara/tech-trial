import "./styles/App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { checkSession } from "./redux/Auth/auth.functions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/REgister";
import UserProfile from "./pages/UserProfile";
import UsersList from "./pages/UsersList";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkSession(token, navigate, dispatch);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <div className="bg">
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/userProfile" element={<AuthRoute component={<UserProfile />} />} />
        <Route path="/usersList" element={<AuthRoute component={<UsersList />} />} />
      </Routes>
    </div>
  );
}

export default App;
