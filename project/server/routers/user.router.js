const express = require("express");
const userModel = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const userRouter = express.Router();

// Create a new user
userRouter.post('/register', async (req, res) => {
    try {
        // check user already exists
        const userExists = await userModel.findOne({ email: req.body.email })
        if (userExists) {
            res.send({
                status: 400,
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
            res.send({
                success: false,
                message: 'user does not exist please check the user entered'
            });
        }
        // second check the password
        const validPassword = await bcrypt.compare(req.body.password, userExist.password);

        if (!validPassword) {
            res.send({
                success: false,
                message: 'Password incorrect'
            });
        }
        res.send({
            success: true,
            message: 'User login successfully'
        })
    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = userRouter;