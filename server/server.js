import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import productRoutes from './routes/productRoute.js';
import path from 'path';
import RentRequest from './routes/RentRequestRoute.js';

const app = express();

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
app.use('/api/rent-request', RentRequest);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});