const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    ownedPaintings: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Painting'
        }
    ],
    likedPaintings: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Painting'
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User