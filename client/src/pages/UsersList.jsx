import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/Auth/auth.functions';

const UsersList = () => {
    const users  = useSelector((state) => state.users);
    console.log("usuarios;", users)
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getAllUsers)
        


    },[] )
  return (
    <div>UsersList</div>

  )
}

export default UsersList