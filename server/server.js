// server/server.js
const express = require('express');
const knex = require('knex');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL, // Render provides this env variable
});

// Pass the db connection to your routes
app.use('/api/auth', authRoutes(db));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});