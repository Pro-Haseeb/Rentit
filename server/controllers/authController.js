import express from 'express';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const register = async (req, res) => {
  const { name, email, password,city, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already registered" });
    }

    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      city,
      phone
    });

    await newUser.save();

    res.status(201).json({ msg: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    // Check password
    const match = await bycrpt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    // Respond
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
        // You can add city, phone etc. if needed
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};