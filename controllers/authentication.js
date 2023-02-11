const User = require("../models/User");
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
    if (req.body.admin) addUser.money = 10000;
    try {
        const savedUser = await addUser.save();
        res.status(201).send({ status: "ok", message: "User Created Successfully", user: savedUser });
    } catch (error) {
        const err = error.message;
        res.status(501).send({ status: "error", message: err });
    }
};


const createUser = async (req) => {
  const hashPassword = await bcrypt.hashSync(req.body.password, 10);
  return new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    city: req.body.city,
    state: req.body.state,
    phone_number: req.body.phone_number,
    money: Math.floor(Math.random() * (10000 - 1000) + 1000),
    adress: req.body.adress,
    admin: req.body.admin,
  });
}

module.exports = register;