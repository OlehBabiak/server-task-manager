const { UserDB } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
  checkUserValidityMiddleware: async (req, res, next) => {
    try {
      const { error } = await userValidator.createUser.validate(req.body);
      if (error) {
        return res.status(400).json({ message: 'Password or email is not valid!' });
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserExistMiddleware: async (req, res, next) => {
    try {
      const userData = req.body;
      const user = await UserDB.findOne({ email: userData.email });
      if (user) {
        return res
          .status(400)
          .json({ message: `User with email ${userData.email} already exist` });
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  checkEmailMiddleware: async (req, res, next) => {
    try {
      const { error } = await userValidator.checkEmail.validate(req.body);
      if (error) {
        return res.status(400).json({ message: `${error.details[0].message}` });
      }
      next();
    } catch (e) {
      next(e);
    }
  },
};
