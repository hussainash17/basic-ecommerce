const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
} = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
// @route   POST api/users/test
// @desc    User Signin
// @access  Public
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;
