import userModels from "../models/userModels.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validate if user already exists
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    // validate if user already exists
    const userExists = await userModels.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save user
    const user = new userModels({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    res.status(201).send({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//POST login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate if user already exists
    if (!email || !password) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    //validate user
    const user = await userModels.findOne({
      email,
    });
    if (!user) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    }

    //generate token
    const token = jwt.sign(
      {
        id: user._id,
        // role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//test controller
export const testController = async (req, res) => {
  res.status(200).send({
    message: "protected route",
  });
};
