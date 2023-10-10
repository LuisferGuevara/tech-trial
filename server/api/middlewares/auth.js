const User = require("../models/user.model");
const { verifyJwt } = require("../../utils/jwt/jwt");


const isAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json("Unauthorized");
       };
      const parsedToken = token.replace("Bearer ", "");
      const validToken = verifyJwt(parsedToken);
      const userLogged = await User.findById(validToken.id);
  
      userLogged.password = null;
      req.user = userLogged;
      req.token = parsedToken;
      next();
    } catch (error) {
      return res.status(401).json("Unauthorized");

    }
  };


module.exports = {isAuth};