const express = require("express");
const routes = express.Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//REGISTER
routes.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

// LOGIN
routes.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("credenciais erradas");

        const hashedPaasword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const password = hashedPaasword.toString(CryptoJS.enc.Utf8);

        if (password == req.body.password) {
            const acessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn: "3d"}
            );
            const { password, ...others } = user._doc;
            res.status(200).json({others, acessToken});
        } else {
            res.status(401).json("password errado");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = routes;
