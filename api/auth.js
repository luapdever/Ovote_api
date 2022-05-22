const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Validatprs
const { registerValidation, loginValidation } = require('../utils/validation');

router.post('/register', async (req, res) => {
  
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

 
    res.status(200).send( user );
  
});

router.post('/login', async (req, res) => {
 
  res.status(200).json({
    error: false,
    message: "Connecter",
    data: null
  })
});

module.exports = router;
