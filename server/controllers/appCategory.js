const db = require('../models/index')
const asyncHandler = require('express-async-handler')

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
    const { categories, apps } = req.body

    for (let i of categories) {
      const id = i.id
      const category = await db.category.findByPk(id)

      if (category) {
        db.category
          .update({ type: i.type }, { where: { id } })
          .catch((error) => next(error))
      } else {
        throw new Error(`Category ${i.categoryName} not found`)
      }
    }

    for (let i of apps) {
      const id = i.id
      console.log(id)
      const app = await db.tracker_data.findByPk(id)

      if (app) {
        db.tracker_data
          .update({ type: i.type, category: i.category }, { where: { id } })
          .catch((error) => next(error))
      } else {
        throw new Error(`App ${i.owner} not found`)
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
