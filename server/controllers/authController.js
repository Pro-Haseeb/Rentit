// controllers/authController.js
import bcrypt from 'bcrypt'; // 🔧 fix spelling (not bycrpt)
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, city, phone } = req.body;
    const cnicImage = req.file ? `/uploads/${req.file.filename}` : null; // 🖼️ Multer added this

    // Proceed to hash password and save user with cnicImagePath
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      city,
      phone,
      cnicImage: cnicImage, // Save in DB
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const login = async (req, res) => {
  const { email, password, isAdminLogin } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    if (isAdminLogin && user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized as admin' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" })
      ;
      if (user.isBlocked) {
    return res.status(403).json({ msg: 'Your account has been blocked by the admin.' });
  }

    const token = jwt.sign(
      { id: user._id, role: user.role, isBlocked: user.isBlocked },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
        firstLogin: user.firstLogin
        
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};
