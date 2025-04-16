const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  moduleName: { type: String, required: true, unique: true },
    createPermission: { type: Boolean, default: false },
    readPermission: { type: Boolean, default: false },
    updatePermission: { type: Boolean, default: false },
    deletePermission: { type: Boolean, default: false },
  
}, { timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);