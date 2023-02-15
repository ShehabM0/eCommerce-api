const { createUser, JWT_Cookie, createJWT } = require("../helper/authHelper");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
    if (req.body.password.length < 6)
        return res.status(501).send({ status: "error", message: "password is too short!" });   
    // checking if email is already exists
    const findEmail = await User.findOne({ email: req.body.email });
    if (findEmail)
        return res.status(501).send({ status: "error", message: "email already exists!" })

    const addUser = await createUser(req);
    if (req.body.admin) addUser.money = 1e6;
    try {
        const savedUser = await addUser.save();
        res.status(201).send({ status: "ok", message: "User Created Successfully", user: savedUser });
    } catch (error) {
        const err = error.message;
        res.status(501).send({ status: "error", message: err });
    }
};


const login = async (req, res) => {
    const findUser = await User.findOne({ email: req.body.email });
    const userPass = findUser && findUser.password;
    const decodedPass = userPass && await bcrypt.compare(req.body.password, userPass);
  
    // if user exists and entered the right password
    if (findUser && decodedPass) {
        // generates JSON web token and store it in cookie
        const accessToken = createJWT(findUser);
        JWT_Cookie(res, accessToken, findUser._id);
        res
            .status(200)
            .send({
            status: "ok",
            message: "User logged In",
            User: findUser,
            Token: accessToken,
            });
    } else {
      res.status(500).send({ status: "error", message: "Please provide a valid email and password!" });
    }
};

const logout = (req, res) => {
    //check if user logged-in
    const isLogged = req.cookies.access_token
    if(!isLogged)
      return res.status(404).send({ status: "error", message: "no logged-in user!!" });
    res.cookie('access_token', '', { maxAge: 1 }); // 1ms
    res.status(201).send({ status: "ok", message: "User Logged-out Successfully" });
};

module.exports = {
    register,
    logout,
    login
}; 