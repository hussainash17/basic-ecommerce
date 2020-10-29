const express = require('express');
const router = express.Router();

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require('../controllers/category');
// use for restricting users
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
// if a user wants to create a category
// he must a signed in and authorised as well as admin
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
// router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
router.put(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.delete(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get('/categories', list);

router.param('categoryId', categoryById);
// userId is needed for isAuth and isAdmin
router.param('userId', userById);

module.exports = router;
