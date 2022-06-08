import joi from 'joi';

export const signupSchema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

export const loginSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
});