const mongoose = require('mongoose');

// TODO: change default date to be in user's local time zone

const LogSchema = mongoose.Schema({

    title: {
       type: String,
       required: true,
       default: null
    },
    category: {
        type: String,
        required: true,
        default: null
    },
    isRelevant:{
        type: Boolean,
        default: true
    }, 
    isComplete: {
        type: Boolean,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


module.exports = mongoose.model('Logs', LogSchema);