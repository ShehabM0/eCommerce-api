const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: 
    {
        type: String,
        trim: true,
        required: [true, 'username is missing!'],
        minLength: [3, 'username length is too short!']
    },
    email:
    {
        type: String,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required: [true, 'email is missing!'],
        unique:true,
        lowercase: true
    },
    password:
    {
        type: String,
        trim: true,
        required: [true, 'password is missing!']
    },
    city:
    {
        type:String,
        trim: true,
        required: [true, 'city is missing!']
    },
    state:
    {
        type:String,
        required: [true, 'city is missing!']
    },
    phone_number:
    {
        type: String,
        match: /[0-9]{5,11}$/,
        required: [true, 'phone number is missing!']
    },
    money:
    {
        type: Number,
        default: 10000
    },
    adress:
    {
        type: String
    },
    admin: 
    {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model("user", userSchema)
module.exports = User