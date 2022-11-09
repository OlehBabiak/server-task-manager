const bcrypt = require('bcryptjs');

module.exports = {
  hashPass: (password) => bcrypt.hash(password, 10),

  compare: async (userPass, dbPass) => {
    const isPassMatched = await bcrypt
      .compare(String(userPass), String(dbPass));
    if (!isPassMatched) {
      return isPassMatched;
    }
    return isPassMatched;
  },
};
