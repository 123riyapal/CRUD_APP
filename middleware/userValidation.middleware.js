const { validation } = require("../Controllers/user.validator");

const userValidation = (req, res, next) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
           
        };

        const { error } = validation.validate(userData);
        
        if (error) {
            return res.status(406).json({
                success: false,
                message: `Validation Error: ${error.message}`,
            });
        }

        next();
    } catch (err) {
        console.error("Error in user validation middleware:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { userValidation };
