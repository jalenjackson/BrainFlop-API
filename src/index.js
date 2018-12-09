require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const http = require('http');
const quizRoutes = require('../api/routes/quizzes');
const questionRoutes = require('../api/routes/questions');
const userRoutes = require('../api/routes/user');
const tagRoutes = require('../api/routes/tags');
const timeRoutes = require('../api/routes/time');
const searchRoutes = require('../api/routes/search');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

// App
const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));
// Instantiate Express

// Connect to MongoDB Database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});

// Set up middleware for CORS and allowing JSON in requests
app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  var allowedOrigins = ['http://localhost:3000', 'https://brainflopv2-nvue9coug.now.sh', 'https://www.brainflop.com', 'https://localhost:3000', 'http://127.0.0.1:8081', 'http://localhost:8081'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Instantiate routes we will use
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);
app.use('/users', userRoutes);
app.use('/tags', tagRoutes);
app.use('/time', timeRoutes);
app.use('/search', searchRoutes);

app.use(function(req, res){
  res.status(200).json({
    error: 'The requested url was not found'
  })
});


const server = http.createServer(app);

server.listen(PORT);

console.log('listening on ' + PORT)

module.exports = app;

