const Joi = require("joi");

const validation = Joi.object({
    name: Joi.string().alphanum().min(3).max(25).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).trim().required(),
   
});

module.exports = {validation};
