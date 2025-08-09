// models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: String,
  phone: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },cnicImage: {
  type: String,
  required: true
}
,
  isBlocked: {
    type: Boolean,
    default: false
  }
  ,
  // Tutorial After clicking skip it become false
   firstLogin: {
    type: Boolean,
    default: true
  }
});



export default mongoose.model('User', userSchema);
