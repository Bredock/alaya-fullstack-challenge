const jsonwebtoken = require('jsonwebtoken');

/**
 * Issues a JWT token for a user
 * @param user user
 * @returns Object with the generated token and the expiry
 */
issueJWT = (user) => {
  const cuid = user.cuid;

  const expiresIn = '1d';

  const payload = {
    id: cuid,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresIn,
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};

module.exports = {
  issueJWT,
};
