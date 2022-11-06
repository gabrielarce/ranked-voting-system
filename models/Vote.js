const mongoose = require('mongoose')

const VoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rank1: {
        type: String,
        required: true,
    },
    rank2: {
        type: String,
        required: true,
    },
    rank3: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Vote', VoteSchema)