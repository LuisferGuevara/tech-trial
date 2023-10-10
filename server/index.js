const express = require("express");
const cors = require("cors");
require("dotenv").config();
const indexRoutes = require("./api/routes/index/index.routes");
const usersRoutes = require("./api/routes/auth/authUser.routes");
const connectDb = require("./utils/database/db");
connectDb();

const PORT = 8080;
const server = express();

server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || "Unexpected error");
});

server.use("/", indexRoutes);
server.use("/users", usersRoutes);
server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
