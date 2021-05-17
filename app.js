const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const usersRoute = require('./routes/users');

app.use('/users', usersRoute);

// ROUTES
app.get('/', (req, res) => {
    res.send("it's alive!");
});


// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB!')
);


// LISTENER TO SERVER 
app.listen(3000);