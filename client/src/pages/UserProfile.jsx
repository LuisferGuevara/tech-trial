import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import "../styles/Profile.scss";
import Navbar from "../components/Navbar";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="main-container">
      <Navbar/>
      <UserCard user={user} />;
    </div>
  );
};

export default UserProfile;
