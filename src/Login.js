const express = require('express');
const User = require('../models/SignupLoginmodel');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt')
const saltRounds = 10;

// Define your routes
router.post('/signup', async (req, res) => {
   const { email, password } = req.body;

   try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({ message: "Email is already registered" });
      }

      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ email, password: hash });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_TOKEN);

      return res.status(200).json({ token, email: newUser.email, userId: newUser._id });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
   }
});

router.post('/login', async (req, res) => {


   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
         return res.status(400).json({ message: "invalid credential" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);
      return res.status(200).json({ token, name: user.name, email: user.email, userId: user._id });

   }
   catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" })

   }
});

// Export the router
module.exports = router;
