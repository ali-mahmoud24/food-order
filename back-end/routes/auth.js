const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
  '/signup',
  [
    check('firstName').isEmpty(),
    check('secondName').isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;