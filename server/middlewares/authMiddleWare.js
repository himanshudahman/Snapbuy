import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Route from base
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    } else {
      next();
    }
  } catch (error) {
    console.log("Admin Middleware Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Error in admin middleware" });
  }
};
