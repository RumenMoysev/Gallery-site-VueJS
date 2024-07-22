const router = require('express').Router()

const paintingsManager = require('../managers/paintingsManagers.js')
const userManager = require('../managers/userManager.js')

router.get('/', async (req, res) => {
    try {
        const paintings = await paintingsManager.getAllPaintings()

        res.status(200).json(paintings)
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
})

router.get('/last2', async (req, res) => {
    try {
        const paintings = await paintingsManager.getLast2()

        res.status(200).json(paintings)
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
})

router.get('/:paintingId', async (req, res) => {
    const paintingId = req.params.paintingId

    try {
        const paintingDetails = await paintingsManager.getPaintingDetails(paintingId)
        res.status(200).json(paintingDetails)
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
})

router.post('/', async (req, res) => {
    const userId = req.cookies.userId

    const paintingData = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        summary: req.body.summary,
        description: req.body.description,
        price: req.body.price,
        createdAtTime: req.body.createdAtTime,
        owner: userId
    }

    try {
        const painting = await paintingsManager.createPainting(paintingData)
        await userManager.addToCreated(userId, painting._id)

        res.status(201).json(painting)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.post('/:paintingId/like', async (req, res) => {
    const paintingId = req.params.paintingId
    const userId = req.cookies?.userId

    try {
        if (userId) {
            const painting = await paintingsManager.getPaintingDetails(paintingId)

            if(!painting.likes.includes(userId) && painting.owner != userId) {
                await paintingsManager.likePainting(paintingId, userId)
                await userManager.addToLiked(userId, paintingId)
                res.status(200).end()
            } else {
                res.status(401).json({
                    message: 'You have already liked this painting!'
                })
            }
        }
    } catch (error) {
        res.status(401).json({
            message: err.message
        })
    }
})

router.put('/:paintingId', async (req, res) => {
    const userId = req.cookies.userId
    const paintingId = req.params.paintingId

    const paintingDetails = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        summary: req.body.summary,
        description: req.body.description,
        price: req.body.price,
        updatedAtTime: req.body.updatedAtTime
    }

    try {
        const painting = await paintingsManager.getPaintingOwner(paintingId)
        if (painting.owner == userId) {
            const painting = await paintingsManager.editPainting(paintingDetails, paintingId)

            res.status(200).json({painting})
        } else {
            res.status(400).json({
                message: "You are not the owner"
            })
        }
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
})

router.delete('/:paintingId', async (req, res) => {
    const paintingId = req.params.paintingId
    const userId = req.cookies.userId

    try {
        const painting = await paintingsManager.getPaintingOwner(paintingId)

        if(painting.owner == userId) {
            await paintingsManager.deletePainting(paintingId)
            res.status(200).end()
        }
        else {
            res.status(400).json({
                message: "You are not the owner"
            })
        }
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
    }
})

module.exports = router