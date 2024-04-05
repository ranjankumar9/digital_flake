const express = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/user.model");
const jwt = require('jsonwebtoken');
const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ $or: [{ name }, { email }] });
        if (existingUser) {
            return res.status(201).json({ msg: "User with this name or email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ msg: "Signup Successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Signup Failed!", error: err.message });
        console.error(err);
    }
});

UserRouter.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "Password Reset Link Send Successfully!" });
    } catch (error) {
        res.status(500).json({ msg: "Password Reset Link Send Failed!", error: error.message });
    }
});

UserRouter.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ msg: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ msg: "Password reset successful" });
    } catch (error) {
        res.status(202).json({ msg: "Password reset failed", error: error.message });
    }
});

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                throw err;
            }
            if (result) {
                const token = jwt.sign({ userId: user._id }, "mock");
                res.send({ msg: "Login Successful", token, userDetails: { user: user.name, email: user.email } });
            } else {
                res.send({ msg: 'Invalid email / password Please try again!' });
            }
        });
    } catch (err) {
        res.status(500).json({ msg: "Login Failed", error: err.message });
    }
});

UserRouter.post("/logout", async (req, res) => {
    try {
        const { email } = req.body;
        await userModel.findOneAndUpdate({ email }, { token: null });

        res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).json({ msg: "Logout failed", error: error.message });
    }
});

module.exports = {
    UserRouter
};
