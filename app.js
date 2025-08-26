// app.js (Node.js server on port 3001)
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for all other routes (optional for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});
