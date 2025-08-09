import User from '../models/user.js';

const Tutorial = async (req, res) => {
   try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstLogin: false },
      { new: true }
    );
    console.log("User updated:", updatedUser.id); // <-- add this


    res.status(200).json({ msg: 'Tutorial dismissed', user: updatedUser });
  
}catch (err) {
    console.error("Error updating firstLogin:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default Tutorial;
