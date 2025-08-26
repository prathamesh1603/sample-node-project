const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for SPA routes (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});
