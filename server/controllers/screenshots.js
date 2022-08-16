const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')

const getScreenshotSetting = asyncHandler(async (req, res) => {
    try {
        const { organization } = req.params

        const data = await db.screenshot_setting.findOne({
            where: { organization },
        })

        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ Error: error.message })
    }
})

const updateScreenshotSetting = asyncHandler(async (req, res) => {
    try {
        const { organization, body } = req.body
        const data = await db.screenshot_setting.findOne({
            where: { organization },
        })

        if (data) {
            const id = data.id
            await db.screenshot_setting.update(body, {
                where: { organization, id },
            })

            res.statusCode = 200

            res.send('Setting Updated Successfully')
        } else {
            const id = uuidv4()

            await db.screenshot_setting.create({
                id,
                ...body,
                organization,
                time: new Date().getTime(),
            })

            res.statusCode = 200
            res.send('Setting Updated Successfully')
        }
    } catch (error) {
        res.status(500).json({ Error: error.message })
    }
})

module.exports = { updateScreenshotSetting, getScreenshotSetting }
