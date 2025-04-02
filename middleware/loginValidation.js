const Joi = require("joi");

const loginValidationSchema = Joi.object({
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
});

const loginValidation =  (req, res, next) => {
    try {
        loginValidationSchema.validate(req.body);
        next(); 
    } catch (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
};

module.exports = { loginValidation };
