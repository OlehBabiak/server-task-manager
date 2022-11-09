const Joi = require('joi');
const emailRegexp = require('./email.regexp');

module.exports = {
  createUser: Joi.object().keys({
    email: Joi.string().regex(emailRegexp.EMAIL_REGEXP).required(),
    password: Joi.string().min(6).max(60).required(),
  }),

  checkEmail: Joi.object().keys({
    email: Joi.string().regex(emailRegexp.EMAIL_REGEXP).required(),
  }),
};
