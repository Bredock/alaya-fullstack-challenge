const User = require('../models/user');
const passwordUtils = require('../utils/password');
const jwtUtils = require('../utils/jwt');
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');

/**
 * Logs a user issuing the JWT
 * @param req
 * @param res
 * @returns void
 */
login = (req, res) => {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
    return;
  }

  User.findOne({ userName: req.body.user.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    const isValid = passwordUtils.validatePassword(
      req.body.user.password,
      user.hash,
      user.salt
    );

    const returnUser = {
      userName: user.userName,
      cuid: user.cuid,
    }

    if (isValid) {
      const tokenObjt = jwtUtils.issueJWT(user);
      res.json({ token: tokenObjt.token, expiresIn: tokenObjt.expires, user: returnUser });
    } else {
      res.status(401).json({ msg: 'Incorrect password' })
    }
  });
};

/**
 * Registers a user issuing the JWT
 * @param req
 * @param res
 * @returns void
 */
register = (req, res) => {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
    return;
  }

  const { salt, genHash: hash } = passwordUtils.genPassword(req.body.user.password);

  const newUser = new User({
    userName: req.body.user.email,
    hash,
    salt,
  });

  // Let's sanitize inputs
  newUser.userName = sanitizeHtml(newUser.userName);

  newUser.cuid = cuid();

  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    const jwt = jwtUtils.issueJWT(saved);

    const returnUser = {
      userName: saved.userName,
      cuid: saved.cuid,
    }

    res.json({ user: returnUser, token: jwt.token, expiresIn: jwt.expires });
  });
};

module.exports = {
  login,
  register,
};
