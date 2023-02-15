const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const createUser = async (req) => {
    const hashPassword = await bcrypt.hashSync(req.body.password, 10);
    return new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      city: req.body.city,
      state: req.body.state,
      phone_number: req.body.phone_number,
      money: Math.floor(Math.random() * (1e6 - 10000) + 10000),
      adress: req.body.adress,
      admin: req.body.admin,
    });
}


const createJWT = (user) => {
    const token = jwt.sign(
         {
           id: user._id,
           admin: user.admin,
         },
         process.env.JWT_KEY,
         { expiresIn: process.env.JWT_LIFETIME }
       );
     return token;
}
 
const JWT_Cookie = (res, token, user_id) => {
    res.cookie("access_token", { accessToken: token, id: user_id },
    {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24h
    });
}

const checkPass = async (req_pass, user_pass) => {
  return await bcrypt.compare(req_pass, user_pass);
}

module.exports = {
  createUser,
  JWT_Cookie,
  checkPass,
  createJWT
};