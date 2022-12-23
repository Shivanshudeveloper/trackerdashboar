const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const {v4: uuid} = require('uuid')

const createCategory = asyncHandler(async (req, res, next) => {
  const { data } = req.body
  const time = new Date().getTime()

  console.log('here')

  const newData = {
    ...data,
    time,
  }

  await db.category
    .create(newData)
    .then((response) => {
      res.statusCode = 200
      res.json(response)
    })
    .catch((error) => next(error))
})

const getCategories = asyncHandler(async (req, res, next) => {
  const { organization } = req.params

  await db.category
    .findAll({ where: { organization } })
    .then((response) => {
      res.statusCode = 200
      res.json(response)
    })
    .catch((error) => next(error))
})

const updateCategoryAndApps = asyncHandler(async (req, res, next) => {
  try {
    const { categories, apps, team, organization } = req.body

    for (let i of categories) {
      const id = i.id
      db.category
        .update({ type: i.type }, { where: { id } })
        .catch((error) => next(error))
    }

    for (let i of apps) {
      db.tracker_data
        .update(
          { type: i.type, category: i.category },
          { where: { owner: i.owner, team, organization } }
        )
        .catch((error) => next(error))

      const isExist =  await db.productivity_settings.findOne({
        where: {organization, owner: i.owner, team}
      })

      if (isExist) {
        db.productivity_settings
        .update(
          { type: i.type, category: i.category },
          { where: { owner: i.owner, team, organization } }
        )
        .catch((error) => next(error))
      } else {
        db.productivity_settings
        .create({
          id: uuid(),
          organization,
          team,
          owner: i.owner,
          type: i.type,
          category: i.category,
          time: new Date()
        })
        .catch((error) => {
          console.log(error)
          next(error)
        })
      }
    }

    res.statusCode = 200
    res.json('Updated Successfully')
  } catch (error) {
    console.log(`${error.message}`.red)
    next(error)
  }
})

const getAllApps = asyncHandler(async (req, res, next) => {
  const { organization } = req.params

  await db.tracker_data
    .findAll({ where: { organization } })
    .then((response) => {
      res.statusCode = 200
      res.json(response)
    })
    .catch((error) => next(error))
})

module.exports = {
  createCategory,
  getCategories,
  updateCategoryAndApps,
  getAllApps,
}
