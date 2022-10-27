const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "user"
    }],
    active: {
        type: Boolean,
        default: true 
    },
    aiotku_id: {
        type: Number,
    }
})

module.exports = mongoose.model('User', userSchema)