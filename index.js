const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
// Import Routes
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// Middlewares
app.use(cors());
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
    res.send("it's alive!");
});
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);



// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB!')
);


// LISTENER TO SERVER 
app.listen(3000);