const express = require('express');

const router = express.Router();

const { userSignupValidator } = require('../validator/index');
const { signup, signin, signout } = require('../controllers/user.js');

router.post('/signup', userSignupValidator, signup);

router.post('/signin', signin);

router.get('/signout', signout);

module.exports = router;
