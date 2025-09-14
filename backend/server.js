const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const gameRoutes = require('./routes/gameRoutes');
app.use('/api/game', gameRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
