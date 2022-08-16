const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const client = require('../config/fusionAuthConfig')
require('dotenv').config()

const registerToFusionauth = asyncHandler(async (req, res) => {
    client
        .register(null, req.body)
        .then((clientResponse) => {
            console.log('Registration Successfull')
            res.status(200).send(JSON.stringify(clientResponse.successResponse))
        })
        .catch((error) => {
            console.log(error)
            res.status(error.statusCode).json({
                message: 'Error registering User',
            })
        })
})

const loginToFusionauth = asyncHandler(async (req, res) => {
    if (req.session.user) {
        res.status(400).send('User already logged in')
    } else {
        const obj = {
            loginId: req.body.email,
            password: req.body.password,
            applicationId: process.env.APPLICATION_ID,
        }

        client
            .login(obj)
            .then(async (clientRes) => {
                const userData = await db.admin.findOne({
                    where: { email: req.body.email },
                })

                req.session.user = clientRes.successResponse.user
                req.session.token = clientRes.successResponse.token

                const data = {
                    token: JSON.stringify(clientRes.successResponse.token),
                    user: { ...userData.dataValues, role: 'Admin' },
                }
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(error.statusCode).json({
                    message:
                        error.statusCode === 404
                            ? 'User Not Found. Please Register'
                            : 'Error Login User',
                })
            })
    }
})

const logoutFromFusionauth = asyncHandler(async (req, res, next) => {
    req.session.destroy()
    res.statusCode = 200
    res.json({ message: 'Successfully logged out' })
})

const registerToPostgres = asyncHandler(async (req, res, next) => {
    const { fullName, email, id } = req.body
    const time = new Date().getTime()

    await db.admin.create({
        id,
        fullName,
        email,
        time,
    })

    await db.admin
        .findOne({ where: { email } })
        .then((response) => {
            res.statusCode = 200
            res.json(response)
        })
        .catch((error) => next(error))
})

const getAdminOfOrganization = asyncHandler(async (req, res, next) => {
    const { organization } = req.params
    await db.admin
        .findAll({ where: { organization } })
        .then((response) => {
            res.statusCode = 200
            res.json(response)
        })
        .catch((error) => next(error))
})

const updateOrganizationOfAdmin = asyncHandler(async (req, res, next) => {
    const { organization, email } = req.body

    await db.admin
        .update({ organization }, { where: { email } })
        .then(() => {
            db.admin
                .findOne({ where: { email } })
                .then((response) => {
                    res.statusCode = 200
                    res.json(response)
                })
                .catch((error) => next(error))
        })
        .catch((error) => next(error))
})

module.exports = {
    registerToFusionauth,
    loginToFusionauth,
    logoutFromFusionauth,
    registerToPostgres,
    getAdminOfOrganization,
    updateOrganizationOfAdmin,
}
