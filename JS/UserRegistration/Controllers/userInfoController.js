const User = require('../models/user.model');
const errorMessages = require('../utils/errorMessages');

const userInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('roleId');
    if (!user) {
      return res.status(404).json({ message: errorMessages.USER_NOT_FOUND });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.roleId.name
    });
  } catch (err) {
    res.status(500).json({ error: errorMessages.SERVER_ERROR(err.message) });
  }
};

const modifyUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: errorMessages.MISSING_FIELDS });
    }

    const userToUpdate = await User.findByIdAndUpdate(id, { name, email }, { new: true }).select('-password').populate('roleId');
    if (!userToUpdate) {
      return res.status(404).json({ message: errorMessages.USER_NOT_FOUND });
    }
    res.json({
      _id: userToUpdate._id,
      name: userToUpdate.name,
      email: userToUpdate.email,
      role: userToUpdate.roleId.name
    });
  } catch (error) {
    res.status(500).json({ message: errorMessages.UPDATE_USER_ERROR });
  }
};

module.exports = { 
  userInfo,
  modifyUser
};