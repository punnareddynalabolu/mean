var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let User = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
   
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        select:false
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
},{versionKey: false});


module.exports = mongoose.model('registration', User,'registration');
