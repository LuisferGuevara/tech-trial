const User = require("../models/user.model");
const { verifyJwt } = require("../../utils/jwt/jwt");


const isAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json("Unauthorized");
       };
      const parsedToken = token.replace("Bearer ", "");
      const validToken = verifyJwt(parsedToken);
      const userLogged = await User.findById(validToken.id);
  
      userLogged.password = null;
      req.user = userLogged;
      next();
    } catch (error) {
      return next(error);
    }
  };

const isAdmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json("Unauthorized");
       };
      const parsedToken = token.replace("Bearer ", "");
      const validToken = verifyJwt(parsedToken);
      const userLogged = await User.findById(validToken.id);
  
      if(userLogged === "admin"){
        userLogged.password = null;
        req.user = userLogged;
        next();
      } else {
        return next("Your profile is: user")
      }
    } catch (error) {
      return next(error);
    }
  };

module.exports = {isAuth, isAdmin};