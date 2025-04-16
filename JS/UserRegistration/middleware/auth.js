const jwt = require('jsonwebtoken');
const RoleHasPermission = require('../models/roleHasPermission.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');
const  permission = require('../models/permission.model');
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


const restrictTo = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const role = await Role.findById(req.user.roleId);
      if (!role || !allowedRoles.includes(role.name)) {
        return res.status(403).json({ 
          message: `Access denied. Requires one of these roles: ${allowedRoles.join(', ')}` 
        });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error checking role permissions' });
    }
  };
};

module.exports = { verifyToken, restrictTo };