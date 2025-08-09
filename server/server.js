import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import productRoutes from './routes/productRoute.js';
import path from 'path';
import RentRequest from './routes/rentRequest.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import adminRoute from './routes/adminRoute.js';
import Tutorial from "./routes/tutorialRoute.js";
import Contact from './routes/contactRoute.js';

const app = express();
import  "./schedulers/checkRental.js"; // Import the scheduler to ensure it runs



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("MONGO_URI =>", process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Mongo DB connected");
}).catch((err) => {
    console.log("Error", err);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected to frontend!' });
});

app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join('uploads'))); // Serve static files from 'uploads' directory
app.use('/api/products', productRoutes);
app.use('/api/rentals', RentRequest);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoute);
app.use('/api/tutorial', Tutorial);
app.use('/api/contact', Contact);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});