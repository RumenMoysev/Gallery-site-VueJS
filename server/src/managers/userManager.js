const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwtPromise.js')
const SECRET = require('../configs/config.js')

const usernameLength = 4
const emailLength = 5
const passwordLength = 4

function validate(userData, rePassword) {
    if (userData.email.length < emailLength) {
        throw new Error(`Email should be at least ${emailLength} characters long.`)
    }

    if (userData.username) {
        if (userData.username.length < usernameLength) {
            throw new Error(`Username should be at least ${usernameLength} characters long.`)
        }
    }

    if (userData.password.length < passwordLength) {
        throw new Error(`Password should be at least ${passwordLength} characters long.`)
    }

    if (rePassword) {
        if (rePassword !== userData.password) {
            throw new Error('Passwords do not match')
        }
    }
}

exports.register = async (userData, rePassword) => {
    try {
        validate(userData, rePassword)

        userData.password = await bcrypt.hash(userData.password, 10)

        const user = await User.create(userData)

        return getAuthResult(user)
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.login = async (userData) => {
    try {
        validate(userData)

        const user = await User.findOne({ email: userData.email, username: userData.username })

        if (user) {
            const isValid = await bcrypt.compare(userData.password, user.password)

            if (!isValid) {
                throw new Error('Email or password do not match!')
            }

            return getAuthResult(user)
        } else {
            throw new Error('Email, username or password do not match!')
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.findUser = async (userId) => {
    const user = await User.findById(userId)

    if(user) {
        return getAuthResult(user)
    } else {
        throw new Error('Invalid userId!')
    }
}

exports.addToCreated = (userId, paintingId) => {
    try {
        return User.findByIdAndUpdate(userId, {$push: {ownedPaintings: paintingId}})
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.addToLiked = (userId, paintingId) => {
    try {
        return User.findByIdAndUpdate(userId, {$push: {likedPaintings: paintingId}})
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.getOwned = (userId) => {
    try {
        return User.findById(userId).populate('ownedPaintings')
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.getLiked = (userId) => {
    try {
        return User.findById(userId).populate('likedPaintings')
    } catch (err) {
        throw new Error(err.message)
    }
}

async function getAuthResult(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
    }

    const token = await jwt.sign(payload, SECRET)

    return [payload, token]
}