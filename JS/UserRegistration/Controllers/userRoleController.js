const User = require('../models/user.model');
const Role = require('../models/role.model');
const errorMessages = require('../utils/errorMessages');

const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleName } = req.body;

    if (!userId || !roleName) {
      return res.status(400).json({ message: errorMessages.MISSING_FIELDS });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: errorMessages.USER_NOT_FOUND });
    }

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(404).json({ message: errorMessages.ROLE_NOT_FOUND(roleName) });
    }

    user.roleId = role._id;
    await user.save();

    res.status(200).json({
      message: 'Role assigned to user successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: errorMessages.SERVER_ERROR(error.message) });
  }
};

module.exports = { assignRoleToUser };