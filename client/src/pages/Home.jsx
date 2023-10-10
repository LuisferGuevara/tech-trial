// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import "../styles/Home.scss";

const Home = () => {
    const { user, isLoading } = useSelector((state) => state.auth);
    if(!user && isLoading){
        return <div>Loading...</div>
    }
  return (
    <div className="home--section">
      <h1>DASHBOARD</h1>
      <h1>HOLA {user?.name} !</h1>

    </div>
  );
};

export default Home;
