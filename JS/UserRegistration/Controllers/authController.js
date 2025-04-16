const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const errorMessages = require('../utils/errorMessages');

const generateToken = (user) => {
  return jwt.sign({
    id: user._id,
    roleId: user.roleId
  }, process.env.JWT_KEY, { expiresIn: '1d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: errorMessages.MISSING_FIELDS });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: errorMessages.USER_ALREADY_EXISTS });
    }
    const roleDoc = await Role.findOne({ name: role });
    if (!roleDoc) {
      return res.status(400).json({ success: false, message: errorMessages.ROLE_NOT_FOUND(role) });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
      name, 
      email, 
      password: hashPassword,
      roleId: roleDoc._id,
    });
    if (newUser) {
      const token = generateToken(newUser);
      res.json({ token, permission: { role: roleDoc.name } });
    } else {
      return res.status(400).json({ message: errorMessages.INVALID_USER });
    }
  } catch (err) {
    return res.status(500).json({ message: errorMessages.SERVER_ERROR(err.message) });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; 
    const user = await User.findOne({ email }).populate('roleId');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: errorMessages.INVALID_CREDENTIALS });
    }
    const token = generateToken(user);
    res.json({ token, permission: { role: user.roleId.name } });
  } catch (err) {
    res.status(500).json({ message: errorMessages.SERVER_ERROR(err.message) });
  }
};

module.exports = { 
  registerUser, 
  loginUser
};