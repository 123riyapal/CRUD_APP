const Joi = require('joi');

const userValidationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(25).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).trim().required(),
  role: Joi.string().valid('admin', 'teacher','student').required(), 
});
const loginValidationSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).trim().required(),
});

const userValidation = (req, res, next) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const { error } = userValidationSchema.validate(userData, { abortEarly: false });
    if (error) {
      return res.status(406).json({
        success: false,
        message: 'Validation Error',
        details: error.details.map((err) => err.message),
      });
    }
    next();
  } catch (err) {
    console.error('Error in user validation middleware:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const loginValidation = (req, res, next) => {
  try {
    const { error } = loginValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        details: error.details.map((err) => err.message),
      });
    }
    next();
  } catch (error) {
    console.error('Error in login validation middleware:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = { userValidation, loginValidation };