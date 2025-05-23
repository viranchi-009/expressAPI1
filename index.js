const express = require('express');
const app = express();
const cors = require('cors'); // <-- ADD THIS LINE
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

app.use(cors()); // ✅ enable CORS for all origins
app.use(express.json());

// Sample vendor data
const vendors = [
  {
    code: 'vdr123',
    name: 'Alpha Traders',
    contact: 'alpha@example.com',
    phone: '123-456-7890',
    address: '123 Alpha Street, Cityville'
  },
  {
    code: 'vdr456',
    name: 'Beta Supplies',
    contact: 'beta@example.com',
    phone: '987-654-3210',
    address: '456 Beta Avenue, Townsburg'
  },
  {
    code: 'vdr789',
    name: 'Gamma Goods',
    contact: 'gamma@example.com',
    phone: '555-666-7777',
    address: '789 Gamma Road, Marketcity'
  }
];

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// Greet route
app.get('/api/greet', (req, res) => {
  res.json({ message: 'Hello from your custom API!' });
});

// Post route for generic data
app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

// Get vendor by vendor code
app.get('/api/vendor/:code', (req, res) => {
  const { code } = req.params;
  const vendor = vendors.find(v => v.code === code.toLowerCase());

  if (vendor) {
    res.json(vendor);
  } else {
    res.status(404).json({ error: 'Vendor not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
