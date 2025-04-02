const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // dob: {
    //     type: Date,
    //     required: true
    // },
    // age: {
    //     type: Number,
    //     required: true
    // },
    // gender: {
    //     type: String,
    //     enum: ['Male', 'Female', 'Other'],
    //     required: true
    // },
    // phone: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     validate: {
    //         validator: function (val) {
    //             return (/^(?:\+91[- ]?)?[6-9]\d{9}$/).test(val);
    //         },
    //         message: "Invalid Indian mobile number. Number must have 10 digits."
    //     }
    // }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
