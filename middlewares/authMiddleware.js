import Jwt from "jsonwebtoken";
import userModels from "../models/userModels.js";

//protected routes
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.user.id);
    if (user.role !== 1) {
      return res.status(401).send({
        succss: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
