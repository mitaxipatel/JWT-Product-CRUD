const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

// User login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Login failed. Incorrect password." });
        }

        const token = jwt.sign({ userId: user._id }, 'hgjgjhkjkjvjvhbj', {
            expiresIn: '1h',
        });

        res.status(200).send({ message: "Login successful.", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: 'patelmitaxi2001@gmail.com', // your email
        pass: 'your-email-password', // your email password or app password
    },
});

// Generate OTP and send email
const sendOtp = async (email, otp) => {
    const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};

// User registration
const registerUser = async (req, res) => {
    try {
        const { email, password, otp } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already in use." });
        }

        // Generate a random OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        await sendOtp(email, otpCode);

        // Save the OTP temporarily (you may want to use a more secure way, like in-memory cache)
        req.session.otp = otpCode; // Assuming you're using express-session or a similar package
        req.session.email = email; // Store email for verification

        return res.status(200).send({ message: "OTP sent to your email." });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

// OTP Verification and User Creation
const verifyOtpAndRegister = async (req, res) => {
    try {
        const { otp } = req.body;

        // Check if the OTP matches and is still valid
        if (req.session.otp === otp) {
            // Proceed with user registration
            const { email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword
            });

            const savedUser = await newUser.save();

            const token = jwt.sign({ userId: savedUser._id }, 'hgjgjhkjkjvjvhbj', {
                expiresIn: '1h',
            });

            // Clear OTP after successful registration
            delete req.session.otp;

            res.status(201).send({ message: "User registered successfully.", user: savedUser, token });
        } else {
            return res.status(400).send({ message: "Invalid OTP. Registration failed." });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};


module.exports = {
    loginUser,
    registerUser,
    verifyOtpAndRegister
};
