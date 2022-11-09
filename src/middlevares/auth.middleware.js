const { authHelper } = require('../helpers/index');
const { OAuth } = require('../dataBase/index');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get('authorization');
      if (!token) {
        return res
          .status(401)
          .json({ message: 'No token!' });
      }
      const user = await authHelper.verifyToken(token);

      const tokenObj = await OAuth.findOne({ "jwt_token": token });
      if (!tokenObj || !user) {
        return res
          .status(401)
          .json({ message: 'Wrong token' });
      }
      req.user = {
        userId: tokenObj.user._id,
        email: tokenObj.user.email,
      };
      next();
    } catch (e) {
      next(e);
    }
  },
};
