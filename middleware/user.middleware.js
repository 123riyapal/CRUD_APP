const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

const verification = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token,"???>>>");
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        const decode = jwt.verify(token, process.env.JWT_KEY);
        console.log(decode,"{{{{{{{{{{{{{{{{{")
        const userInfo = await user.findById(decode.id).select("-password");
        console.log(userInfo,"++++++++++++")
        if (!userInfo) return res.status(404).json({ message: "User not found" });
        req.user = userInfo;
        next();
    } catch (err) {
      return res.status(500).json({ message:+ err.message });
    }
}

module.exports = { verification };
