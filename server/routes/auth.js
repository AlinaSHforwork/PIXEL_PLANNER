// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// This function now accepts the 'db' object
module.exports = (db) => {
  const router = express.Router();

  // Register route
  router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await db('users').where({ username }).first();
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await db('users').insert({ username, password: hashedPassword });

      const [newUser] = await db('users').where({ username });
      const payload = { user: { id: newUser.id } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // Login route
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await db('users').where({ username }).first();
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  return router;
};