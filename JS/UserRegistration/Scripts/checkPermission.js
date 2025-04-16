const connectDB = require('../config/db');
const RoleHasPermission = require('../models/roleHasPermission.model');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');

const checkPermissions = async () => {
  try {
    await connectDB();
    const mappings = await RoleHasPermission.find()
      .populate('roleId', 'name')
      .populate('permissionId', 'moduleName');
    console.log('Role Permissions:');
    mappings.forEach(m => {
      console.log(`${m.roleId.name}: ${m.permissionId.moduleName}`);
    });
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkPermissions();