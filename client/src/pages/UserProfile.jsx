import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import "../styles/Profile.scss";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return <UserCard user={user} />;
};

export default UserProfile;
