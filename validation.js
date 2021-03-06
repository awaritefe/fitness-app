

// validation
const Joi = require('joi');


const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
            .email({ minDomainSegments: 2 }),
        password: Joi.string().min(6)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        phoneNumber: Joi.number().integer().min(7).required()
    });
    return schema.validate(data)
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });
    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;