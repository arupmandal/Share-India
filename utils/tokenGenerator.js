const crypto = require('crypto');

const generateToken = () => {
  const randomString = crypto.randomBytes(2).toString('hex').toUpperCase(); // 4 characters
  return `ShareIndia-${randomString}`;
};

module.exports = generateToken;
