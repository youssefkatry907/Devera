const joi = require('joi');

exports.validateRegisteration = {
    body: joi.object().required().keys({
        firstName: joi.string().empty('').pattern(new RegExp(/^[a-z ,.'-]+$/i)).required().messages({
            "string.empty": "You have to enter first name",
            "string.pattern.base": "Please enter a valid first name",
            "any.required": "You have to enter first name"
        }),
        lastName: joi.string().empty('').pattern(new RegExp(/^[a-z ,.'-]+$/i)).required().messages({
            "string.empty": "You have to enter last name",
            "string.pattern.base": "Please enter a valid last name",
            "any.required": "You have to enter last name"
        }),
        email: joi.string().empty('').email({ minDomainSegments: 2 }).empty('').required().messages({
            "string.email": "Please enter a valid email",
            "string.empty": "You have to enter email",
            "any.required": "You have to enter email"
        }),
        userName: joi.string().alphanum().min(4).max(25).required().messages({
            "string.empty": "You have to enter username",
            'string.min': "Username should have a minimum length of 4",
            'string.max': "Username should have a maximuim length of 25",
            "any.required": "You have to enter username"
        }),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
            "string.empty": "You have to enter password",
            "string.pattern.base": "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number",
            "any.required": "You have to enter password"
        }),
        confirmPassword: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
            "string.empty": "You have to enter confim password",
            "string.pattern.base": "Password mismatch",
            "any.required": "You have to enter confim password"
        })
    })
}

//________________________________________________________________________

exports.validateLogin = {
    body: joi.object().required().keys({
        email: joi.string().empty('').email({ minDomainSegments: 2 }).empty('').required().messages({
            "string.email": "Please enter a valid email",
            "string.empty": "You have to enter email",
            "any.required": "You have to enter email"
        }),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
            "string.empty": "You have to enter password",
            "string.pattern.base": "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number",
            "any.required": "You have to enter password"
        }),
    })
}