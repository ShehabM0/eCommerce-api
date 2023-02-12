const { checkPass, JWT_Cookie, createJWT } = require("../helper/authHelper");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    try {
        const getUser = await User.findById(req.params.id);
        if (getUser) res.status(200).send({ status: "ok", user: getUser });
        else res.status(404).send({ status: "error", message: "not found" });
    } catch (error) {
        const err = error.message;
        res.status(500).send({ status: "error", message: err });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).send({ status: "ok", users: allUsers, count: allUsers.length});
    } catch (error) {
        const err = error.message;
        res.status(500).send({ status: "error", message: err });
    }
};

const updateUser = async (req, res) => {
    const user_id = req.params.id;
    const param_userPassword  = req.body.password;
    // user can't update if he didn't provide his account's password
    if(!param_userPassword)
        return res.status(403).send({ status: "error", message: "Please provide your password!"});
    try {
        const findUser = await User.findById(user_id);
        if(!findUser)
            return res.status(404).send({ status: "error", message: "User not found!"});
        // checking if user entered the right password
        const mathcedPass = await checkPass(param_userPassword, findUser.password);
        if(!mathcedPass)
            return res.status(501).send({ status: "error", message: "Incorrect password!"});
        // removing password from the request so that it is not updated
        delete req.body.password;
        // updating user
        const updatedUser = await User.updateOne({ _id: user_id }, req.body, { runValidators: true });
        // updating user's token
        const accessToken = createJWT(findUser);
        JWT_Cookie(res, accessToken, findUser._id);

        res.status(200).send({ status: "ok", user: updatedUser, token: accessToken });
    } catch (error) {
        const err = error.message;
        res.status(500).send({ status: "error", message: err });
    }
};

const updateUserPass = async (req, res) => {
    const {password, newPassword} = req.body;
    if(!password || !newPassword)
        return res.status(501).send({ status: "error", message: "Please provide your old password and new password"});
    try {
        const findUser = await User.findById(req.params.id);
        if(!findUser)
            return res.status(404).send({ status: "error", message: "User not found!"});
        // checking if entered passwords matches
        const mathcedPass = await checkPass(password, findUser.password);
        if(!mathcedPass)
            return res.status(501).send({ status: "error", message: "Incorrect password!"});
        // check new password length
        if (newPassword.length < 6)
            return res.status(501).send({ status: "error", message: "your new password is too short!" });
        // hashing new password 
        const hashPassword = bcrypt.hashSync(newPassword, 10);
        findUser.password = hashPassword;
        await findUser.save();
        // updating user's token
        const accessToken = createJWT(findUser);
        JWT_Cookie(res, accessToken, findUser._id);

        res.status(200).send({ status: "ok", user: findUser, token: accessToken });
    } catch (error) {
        const err = error.message;
        res.status(500).send({ status: "error", message: err });
    }
}

module.exports = {
    updateUserPass,
    getAllUsers,
    updateUser,
    getUser
};