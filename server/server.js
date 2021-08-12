/**
 * Module dependencies.
 */
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
const mongoose = require('./Utilities/mongooseConnector')();
const authRoute = require('./Routes/auth');
const config = require("./Utilities/config").config;
let secret = config.jwtsecret
app.use(express.static(path.join(__dirname, '/dist/')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());
app.use(expressJWT({ secret: secret, algorithms: ['HS256']})
    .unless( // This allows access to /token/sign without token authentication
        { path: [
            '/auth/login',
            '/auth/register'
        ]}
    ));
app.use((err, req, res, next) => {
  return res.send({
    "statusCode": 401,
    "statusMessage": "Something Went Wrong!"
  });
});

app.use('/auth', authRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next();
});

/**
 * Start Express server.
 */
server.listen(config.NODE_SERVER_PORT.port, () => {
  console.log('app listening on port:' + config.NODE_SERVER_PORT.port);
});
