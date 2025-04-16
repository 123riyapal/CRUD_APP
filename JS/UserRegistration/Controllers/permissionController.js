const Role = require('../models/role.model');
const RoleHasPermission = require('../models/roleHasPermission.model');
const errorMessages = require('../utils/errorMessages');

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: errorMessages.MISSING_FIELDS });
    }

    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    const role = await Role.create({ name });
    res.status(201).json({ message: 'Role created successfully', role: { name: role.name } });
  } catch (error) {
    res.status(500).json({ message: errorMessages.SERVER_ERROR(error.message) });
  }
};

const assignPermissionToRole = async (req, res) => {
  try {
    const { roleName, moduleName } = req.body;

    if (!roleName || !moduleName) {
      return res.status(400).json({ message: errorMessages.MISSING_FIELDS });
    }

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(404).json({ message: errorMessages.ROLE_NOT_FOUND(roleName) });
    }

    const permission = await Permission.findOne({ moduleName });
    if (!permission) {
      return res.status(404).json({ message: `Permission for module ${moduleName} not found` });
    }

    const existingMapping = await RoleHasPermission.findOne({
      roleId: role._id,
      permissionId: permission._id,
    });

    if (existingMapping) {
      return res.status(400).json({ message: 'Permission already assigned to this role' });
    }

    await RoleHasPermission.create({
      roleId: role._id,
      permissionId: permission._id,
    });

    res.status(200).json({
      message: 'Permission assigned to role successfully',
      role: role.name,
      module: moduleName,
    });
  } catch (error) {
    res.status(500).json({ message: errorMessages.SERVER_ERROR(error.message) });
  }
};

module.exports = { createRole, assignPermissionToRole };