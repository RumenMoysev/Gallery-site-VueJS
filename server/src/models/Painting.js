const mongoose = require('mongoose')

const paintingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAtTime: {
        type: String,
        required: true
    },
    updatedAtTime: {
        type: String
    },
    likes: [
        {
            type: mongoose.Types.ObjectId
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Painting = mongoose.model('Painting', paintingSchema)

module.exports = Painting