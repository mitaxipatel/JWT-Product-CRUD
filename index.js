require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/users', userRouter);
app.use('/products', productRouter);


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
