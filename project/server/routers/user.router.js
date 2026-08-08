const express = require("express");
const userModel = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const jwtToken = require('jsonwebtoken');
const isAuth = require('../middleware/authMiddleware.js');

// Create a new user
userRouter.post('/register', async (req, res) => {
    try {
        // check user already exists
        const userExists = await userModel.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPwd = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashPwd;

        const newUser = await userModel(req.body);
        await newUser.save();

        res.send({
            status: true,
            message: "User created successfully",
            data: newUser
        })
    } catch (error) {
        res.status(500).json(error);
    }

});

// login user
userRouter.post('/login', async (req, res) => {
    try {
        // first check user exist or not 
        const userExist = await userModel.findOne({ email: req.body.email })
        if (!userExist) {
            return res.send({
                success: false,
                message: 'user does not exist please check the user entered'
            });
        }
        // second check the password
        const validPassword = await bcrypt.compare(req.body.password, userExist.password);

        if (!validPassword) {
            return res.send({
                success: false,
                message: 'Password incorrect'
            });
        }
        const token = jwtToken.sign({ userId: userExist._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('jwtToken', token, {
            httpOnly: true
        });

        res.send({
            success: true,
            message: 'User login successfully',
            user: userExist
        })
    } catch (error) {
        res.status(500).json(error);
    }

})

userRouter.get('/current-user', isAuth, async (req, res) => {
    console.log("connected");
    try {
       const verifiedUser = await userModel.findById(req.userId).select('-password');
       if(!verifiedUser) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        });  
       }
        res.json({
            _id: verifiedUser._id,
            name: verifiedUser.name,
            email: verifiedUser.email,
            role: verifiedUser.role,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
})

module.exports = userRouter;