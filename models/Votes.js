const mongoose = require('mongoose')

const VoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    choice1: {
        type: String,
        required: true,
    },
    choice2: {
        type: String,
        required: true,
    },
    choice3: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Vote', VoteSchema)