const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  verifyToken: async (token, tokenType = 'access') => {
    const secretWord = tokenType === 'access' ? 'Access_secret' : 'Refresh_secret';
    const verify = await verifyPromise(token, secretWord);
    return verify
    // console.log('===========================')
    // console.log('verify: ', verify)
    // console.log('===========================')
  },
};
