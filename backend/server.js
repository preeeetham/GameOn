const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/route.js');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); 
app.use(express.json());

// API Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Games API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
