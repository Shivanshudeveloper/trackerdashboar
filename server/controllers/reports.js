const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')

const createReport = asyncHandler(async (req, res, next) => {
  try {
    const { data } = req.body
    const obj = {
      id: uuidv4(),
      ...data,
      time: new Date().getTime(),
    }

    await db.report.create(obj)

    res.status(200).send({ message: 'Report saved successfully' })
  } catch (error) {
    next(error)
  }
})

const getReportsOfTypeofOrganization = asyncHandler(async (req, res, next) => {
  const { type, organization } = req.params
  await db.report
    .findAll({ where: { type, organization } })
    .then((reports) => {
      res.statusCode = 200
      res.json(reports)
    })
    .catch((error) => next(error))
})

const getReportById = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  await db.report
    .findByPk(id)
    .then((report) => {
      res.statusCode = 200
      res.json(report)
    })
    .catch((error) => next(error))
})

const deleteReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  await db.report
    .destroy({ where: { id } })
    .then(() => res.status(200).send('Successfully Deleted'))
    .catch((error) => next(error))
})

module.exports = {
  createReport,
  getReportsOfTypeofOrganization,
  deleteReport,
  getReportById,
}
