const mongoose = require('mongoose');

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
        default: Date.now // TODO: local time zone
    }
})


module.exports = mongoose.model('Logs', LogSchema);