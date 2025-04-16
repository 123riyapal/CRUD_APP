const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    marksheets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marks' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);