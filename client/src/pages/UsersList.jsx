import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/Auth/auth.functions";
import UserCard from "../components/UserCard";

const UsersList = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(dispatch));
  }, [dispatch]);

  return (
    <>
      {users &&
        users.map((user) => (
          <div key={user._id}>
            <UserCard user={user} />
          </div>
        ))}
    </>
  );
};

export default UsersList;
