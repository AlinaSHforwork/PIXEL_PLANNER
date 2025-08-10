// server/server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import directly

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Use the routes without passing the db object
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});