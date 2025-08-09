import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);  // <- Fetch fresh user
    console.log("Decoded Token:", decoded); // Confirm token decode ho raha

    if (!user) return res.status(404).json({ msg: "User not found." });
    if (user.isBlocked) return res.status(403).json({ msg: "Account blocked. Contact admin." });
   req.user = {
  _id: user._id,
  role: user.role,
  firstLogin: user.firstLogin, //Tutorial
};
    
    

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token." });
  }
};
 const isAdmin = (req, res, next) => {
  console.log("User Role:", User.role); // Confirm admin hai ya nahi
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin only' });
  }
};

export default {authMiddleware, isAdmin};
