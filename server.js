// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const validUrl = require('valid-url');
dotenv.config({ path: './config/.env' });
const connectDB = require('./config/db.js');
const { BASE_URL, PORT } = require('./config/index.js');

// Default index path
const index = require('./server/routes/app');
const urls = require('./server/routes/urls');

const app = express(); // create an instance of express
const useragent = require('express-useragent');

connectDB(); // connect to a mongodb instance

// Check if base URL is valid
if (!validUrl.isUri(BASE_URL)) {
  console.error('Invalid base URL');
  process.exit(1);
}

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(useragent.express());

app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/app')));

app.use(
  express.json({
    extended: false,
  }),
); //parse incoming request body in JSON format.

// Tell express to map the default route ('/') to the index route
app.use('/api/urls', urls);
app.use('/', index);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/app/index.html'));
});

app.set('port', PORT);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(PORT, function () {
  console.log(`API running on ${BASE_URL}`);
});
