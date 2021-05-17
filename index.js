const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
// Import Routes
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



// App middleware
app.use('/users', usersRoute);
app.use('/api/user', authRoute);

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