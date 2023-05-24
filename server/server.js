const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');

const posts = require('./routes/post.routes');
const users = require('./routes/user.routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

app.use('/api', posts);
app.use('/api', users);

module.exports = app;