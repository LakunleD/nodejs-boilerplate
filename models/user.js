const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    phonenumber: {
        type: Number,
        required: true
    },
    createdAt:{
        type:Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);