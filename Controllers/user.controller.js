const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const generateToken = (user) => {
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_KEY, { expiresIn: '1d' });
    return token;
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password ) {
            return res.status(400).json({ message: "Please add all field" })
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "user already exist" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashPassword})
        if (newUser) {
            const token = generateToken(newUser);
            res.json({ token });
        } else {
            return res.status(400).json({ message: "Invalid user" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!email || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: "email or password is invalid." });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const modifyUser = async (req, res) => {
    try {
        const { id } = req.user
        const { name, email } = req.body;
        const userToUpdate = await User.findByIdAndUpdate(id, req.body,  ).select("-password");
        if (!userToUpdate) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(userToUpdate);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Please add all field" })
        }
        const userToUpdate = await User.findOneAndReplace( { _id: id }, req.body, { new: true }).select("-password");
        if (!userToUpdate) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(userToUpdate);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

const userInfo = async (req, res) => {
    res.json(req.user)
}
module.exports = { registerUser, loginUser, userInfo, modifyUser,updateUser };