import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { checkSession } from "./redux/Auth/auth.functions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/REgister";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      
      checkSession(token, navigate, dispatch);

    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

      <div className="app">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AuthRoute component={<Profile />} />} />
        </Routes>
      </div>

  );
}

export default App;
