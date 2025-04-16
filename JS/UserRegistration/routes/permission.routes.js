const express = require('express');
const router = express.Router();
const { verifyToken, restrictToAdmin } = require('../middleware/auth');
const { createRole, assignPermissionToRole } = require('../Controllers/permissionController');
const { assignRoleToUser } = require('../Controllers/userRoleController');

router.post('/create-role', verifyToken, createRole);
router.post('/assign-permission', verifyToken, assignPermissionToRole);
router.post('/assign-role', verifyToken, assignRoleToUser);

module.exports = router;