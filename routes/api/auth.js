const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route       GET api/auth
// @desc        Test route
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    // '-field' means leave it at DB, will not send
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/auth
// @desc        Authenticate user & get token
// @access      Public
router.post(
  '/',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Not Authorized' });
      }

      const ifMatch = await bcrypt.compare(password, user.password);

      if (!ifMatch) {
        return res.status(400).json({ msg: 'Wrong Password' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('secretKey'),
        { expiresIn: '30 days' },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
