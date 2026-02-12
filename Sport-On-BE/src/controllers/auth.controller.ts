import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Sporton123";

export const signin = async (req: Request, res: Response): Promise<void> => {
 try {
   const { email, password } = req.body;
   const user = await User.findOne({email});
   if (!user) {
    res.status(400).json({ message: "Invalid Credentials, Email not found" });
    return;
   }
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
    res.status(400).json({ message: "Invalid Credentials, Wrong password" });
    return;
   }
   const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
     expiresIn: "1d", 
    });
    res.json({
     token,
     user: {
       id: user._id,
       email: user.email,
       name: user.name,
     },
    });
 } catch (error) {
  console.error("Signin Error:", error);
  res.status(500).json({ message: "Internal Server Error" });
 }

};


export const initializeAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const count = await User.countDocuments();
    if (count > 0) {
      res.status(400).json({
         message: "We can only have one admin user, if you want to create a new admin, please delete the user manually from the database and try again"
        })
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });
    await newUser.save();

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (error) {
    console.error("Initiate new Admin Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
