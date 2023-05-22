const crypto = require('crypto');

/**
 * Generates the hash and salt for a password
 * @param password Password in plain text
 * @returns Object with the generated hash and salt
 */
genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return {
    salt,
    genHash,
  };
};

/**
 * Validates the password against the hash and salt
 * @param password Password in plain text
 * @param hash the hash of the encoded password
 * @param salt the salt of the encoded password
 * @returns Object with the generated hash and salt
 */
validatePassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
};

module.exports = {
  genPassword,
  validatePassword,
};
