const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')

const createOrganization = asyncHandler(async (req, res, next) => {
  const { data } = req.body
  const time = new Date().getTime()

  const newData = {
    ...data,
    id: uuidv4(),
    time,
  }

  await db.organization
    .create(newData)
    .then(() => {
      res.statusCode = 200
      res.json('Organization created successfully')
    })
    .catch((error) => next(error))
})

const getOrganizationDetail = asyncHandler(async (req, res, next) => {
  const { organization } = req.params

  await db.organization
    .findOne({ where: { name: organization } })
    .then((response) => {
      res.statusCode = 200
      res.json(response)
    })
    .catch((error) => next(error))
})

const updateOrganization = asyncHandler(async (req, res, next) => {
  const { id, data } = req.body
  await db.organization
    .findOne({ where: { id } })
    .then(async (org) => {
      if (org) {
        const newData = {
          name: data.name || org.name,
          logo: data.logo || org.logo,
          customDomain: data.customDomain || org.customDomain,
          timezone: data.timezone || org.timezone,
          trackingMode: data.trackingMode || org.trackingMode,
          trackOn: data.trackOn || org.trackOn,
          trackBetween: data.trackBetween || org.trackBetween,
        }

        console.log(newData)

        await db.organization
          .update(newData, { where: { id } })
          .then(() => {
            res.statusCode = 200
            res.json('organization updated successfully')
          })
          .catch((error) => next(error))
      } else {
        res.statusCOde = 404
        throw new Error('Not Found')
      }
    })
    .catch((error) => next(error))
})

module.exports = {
  createOrganization,
  getOrganizationDetail,
  updateOrganization,
}
