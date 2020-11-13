const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const { body, validationResult } = require('express-validator');
const rateLimit = require("express-rate-limit");


///// Routes pour l'utilisateur
router.post('/signup', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], userCtrl.signup);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3 // maximum de 3 requêtes
  });

  router.use(limiter);
  
router.post('/login', userCtrl.login);

module.exports = router;


