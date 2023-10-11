import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/Auth/auth.functions";
import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";

const UsersList = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(dispatch));
  }, [dispatch]);

  return (
    <>
      <div className="main-container">
        <Navbar />
        <div className="users-list">
        <h3>Usuarios en Base de Datos:</h3>
          {users &&
            users.map((user) => (
              <div key={user._id}>
                <UserCard user={user} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default UsersList;
