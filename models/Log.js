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
    isRelevant:{
        type: Boolean,
        default: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Logs', LogSchema);