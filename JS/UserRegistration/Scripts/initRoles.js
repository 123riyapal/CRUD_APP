const mongoose = require('mongoose');
const Role = require('../models/role.model');
const connectDB = require('../config/db');

const initRoles = async () => {
  try {
    await connectDB();
    const roles = ['admin', 'teacher', 'student'];
    for (const name of roles) {
      await Role.findOneAndUpdate(
        { name },
        { name },
        { upsert: true, new: true }
      );
    }
    console.log('Roles initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing roles:', error.message);
    process.exit(1);
  }
};

initRoles();