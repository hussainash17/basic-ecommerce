const User = require('../models/user');
const jwt = require('jsonwebtoken');
// used for authorization
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { use } = require('../routes/user');

exports.signup = (req, res) => {
  // console.log('req.body', req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exists',
      });
    }
    // if user is found make sure the email and password match
    // create authenticate mathod in user model
    console.log(user.authenticate(password));
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password does not match',
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // oersist the token as 't in cookie  with expire date
    res.cookie('t', token, {
      exprire: new Date() + 9999,
    });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({
    message: 'Signout Successfully',
  });
};
