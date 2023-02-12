const User = require("../models/User");

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

module.exports = {
    getAllUsers,
    getUser
};