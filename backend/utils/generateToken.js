const JWT = require("jsonwebtoken");

// Create Token
const createToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = createToken;
