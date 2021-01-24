const mongoose = require('mongoose');

// TODO: change default date to be in user's local time zone

const LogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true      
    },
    category: {
        type: String,
        required: true
    },
    status: String, // default, crossed out, migrated, done
    date: {
        type: Date,
        default: Date.now // This is currently UTC time when I'm using Postman
    }
})


module.exports = mongoose.model('Logs', LogSchema);