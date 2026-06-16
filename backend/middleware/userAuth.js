const JWT = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // if no token
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    // verifying  token
    let decode;
    try {
      decode = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("JWT verify error :", error.message);
      return res.status(401).json({ success: false, message: "Session exprired, Please login again" });
    }

    // find user
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error?.message || "Authentication error" });
  }
};

module.exports = userAuth;
