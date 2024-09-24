require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key', // Change this to a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Set cookie expiration time (e.g., 1 minute)
}));

// Use routes
app.use('/users', userRouter);
app.use('/products', productRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
