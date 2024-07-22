const Painting = require('../models/Painting.js')

const titleLength = 4
const summaryLength = 10
const descriptionLength = 20

function validate (paintingData) {
    if(paintingData.title.length < titleLength) {
        throw new Error(`Painting title should be at least ${titleLength} characters`)
    }

    if (!paintingData.imageUrl.startsWith('http://') && !paintingData.imageUrl.startsWith('https://')) {
        throw new Error('Please provie a valid image URL')
    }

    if (paintingData.summary.length < summaryLength) {
        throw new Error(`Painting summary should be at least ${summaryLength} characters`)
    }

    if (paintingData.description.length < descriptionLength) {
        throw new Error(`Painting description should be at least ${descriptionLength} characters`)
    }

    if(paintingData.price < 1) {
        throw new Error(`Painting price cannot be less than 1€ !`)
    }
}

exports.getAllPaintings = () => {
    try {
        return Painting.find({}, 'title imageUrl summary createdAtTime updatedAtTime _id')
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.getLast2 = () => {
    try {
        return Painting.find(undefined, 'title imageUrl summary likes _id').sort({$natural: -1}).limit(2)
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.getPaintingDetails = (paintingId) => {
    try {
        return Painting.findById(paintingId, 'title imageUrl summary description price createdAtTime updatedAtTime likes _id owner')
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.getPaintingOwner = (paintingId) => {
    try {
        return Painting.findById(paintingId, 'owner')
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.createPainting = (paintingData) => {
    try {
        validate(paintingData)

        return Painting.create(paintingData)
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.editPainting = (paintingData, paintingId) => {
    try {
        validate(paintingData)

        return Painting.findByIdAndUpdate(paintingId, paintingData)
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.deletePainting = (paintingId) => {
    try {
        return Painting.findByIdAndDelete(paintingId)
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.likePainting = (paintingId, userId) => {
    try {
        return Painting.findByIdAndUpdate(paintingId, {$addToSet: {likes: userId}})
    } catch (err) {
        throw new Error(err.message)
    }
}