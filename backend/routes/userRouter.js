const express = require("express");
const userAuth = require("../middleware/userAuth");
const {
  handleRegisterUser,
  handleUserLogin,
  handleUserLogout,
  handleGetUser,
  handleDeleteUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", handleRegisterUser);
userRouter.post("/login", handleUserLogin);
userRouter.get("/me", userAuth, handleGetUser);
userRouter.post("/logout", handleUserLogout);
userRouter.delete("/delete-account", userAuth, handleDeleteUser);

module.exports = userRouter;
