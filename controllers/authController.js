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
      return res.statue(200).send({
        success: false,
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
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
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
        role: user.role,
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

//forget password forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const {email,answer,newPassword} = req.body
    if (!email){
      res.statue(400).send({message:'Email is required'})
    }
    if (!answer){
      res.statue(400).send({message:'answer is required'})
    }
    if (!newPassword){
      res.statue(400).send({message:'New password is required'})
    }
// check 
const user = await userModels.findOne({email, answer});
// Validation 
if(!user){
  return res.status(404).send({
    success: false,
    message: 'Wrong Email or answer'
  });
  }
  const hashed = await hashPassword(newPassword)
  await userModels.findByIdAndUpdate(user._id, {password: hashed});
  res.status(200).send({
    success: true,
    message: 'Password reset successfully'
  });

}
    catch (error){
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'something went wrong',
        error 
      });
    }
  };


//test controller
export const testController = async (req, res) => {
  res.status(200).send({
    message: "protected route",
  });
};
