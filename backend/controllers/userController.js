const User = require("../models/User");
const createToken = require("../utils/generateToken");
const Validator = require("validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Itinerary = require("../models/Itinerary");

// User registration
const handleRegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Priventing empty inputs
    if (!name || !email || !password) {
      return res.status(404).json({ success: false, message: "All fields are required" });
    }

    // Checking email already exist or not
    const normalizedEmail = email.toLowerCase().trim();

    const exists = await User.findOne({ email: normalizedEmail });

    if (exists) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    // Validating emali
    if (!Validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid Email" });
    }

    // Checking password is strong
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter strong password" });
    }

    // Encripting and hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating User
    const newUser = await new User({
      name,
      email: normalizedEmail,
      password: hashPassword,
    });

    const user = await newUser.save();

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // creating http Only token
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, userData, message: "Registration successful" });
  } catch (error) {
    console.log("User Registraion Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User login
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Priventing empty inputs
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validating email
    if (!Validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    // Get user
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "User name or password are incorrect" });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // token generating
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, userData, message: "Login Successful" });
  } catch (error) {
    console.error("User Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// user Logout
const handleUserLogout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: "Logging Out" });
  } catch (error) {
    console.error("User logout Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user Profile
const handleGetUser = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove user acc
const handleDeleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Remove user from DB
    await Itinerary.deleteMany({ userId });

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Removing Token
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (error) {
    console.error("User Delete Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { handleRegisterUser, handleUserLogin, handleUserLogout, handleGetUser, handleDeleteUser };
