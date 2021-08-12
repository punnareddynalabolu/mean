var mongoose = require('mongoose');
mongoose.set('debug', true);
var config = require("./config").config;

module.exports = function() {
    mongoose.Promise = global.Promise;
   // console.log(config.DB_URL.url);
    var db = mongoose.connect(config.DB_URL.url, { useNewUrlParser: true });
   // console.log('db',db);
    require('../Models/User');
    return db;
};