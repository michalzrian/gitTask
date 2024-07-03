// app.js - Main application file

const express = require('express');
const app = express();
const userRoutes = require('./routing/userRoutes');

// Configuration for parsing and handling JSON in HTTP requests
app.use(express.json());

// Connects the user routes file
app.use('/api', userRoutes);

// Port on which the application will listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
