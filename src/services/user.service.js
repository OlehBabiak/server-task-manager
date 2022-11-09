const jwt = require('jsonwebtoken');

module.exports = {
  createTokenPair: async (payload) => {
    const jwt_token = await jwt.sign(payload, 'Access_secret', { expiresIn: '150m' });
    const refresh_token = await jwt.sign(payload, 'Refresh_secret', { expiresIn: '300m' });

    return {
      jwt_token,
      refresh_token,
    };
  },
  createLoginPayload: (email, id) => ({
    userEmail: email,
    userId: id,
  }),
};
