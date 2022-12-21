import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import * as cloudinary from 'cloudinary';
import path from 'path';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use(express.json())

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// })
cloudinary.config({
    cloud_name: 'dplp6edqp',
    api_key: '124353287855813',
    api_secret: 'mFUJlxEeJuFdOxVd0NoUzo4gcmg'
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', billingRoutes);
app.use('/api/upload', uploadRoutes);

// PAYPAL
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// upload image
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound)

app.use(errorHandler);

const PORT = process.env.PORT || 8029;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);