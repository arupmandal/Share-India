const express = require('express');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/files', fileRoutes);

// Root route with GitHub and donation links
app.get('/', (req, res) => {
  res.status(200).json({
    message: "API is working!",
    github: "https://github.com/arupmandal",
    donate: "https://buymeacoffee.com/arupmandal",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
