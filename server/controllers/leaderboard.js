const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const { sequelize } = require('../models/index')

const getActiveHours = asyncHandler(async (req, res, next) => {
  try {
    const { organization, team } = req.params

    let data
    let activeHours
    let totalHours

    if (team === 'All Teams') {
      data = await db.tracker_data.findAll({
        attributes: [
          'userid',
          [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
          [sequelize.fn('count', sequelize.col('duration')), 'count'],
        ],
        where: {
          organization,
        },
        group: ['userid'],
        order: sequelize.literal('sum DESC'),
        limit: 5,
      })

      totalHours = await db.tracker_data.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('duration')), 'total']],
        where: {
          organization,
        },
      })
    } else {
      data = await db.tracker_data.findAll({
        attributes: [
          'userid',
          [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
          [sequelize.fn('count', sequelize.col('duration')), 'count'],
        ],
        where: {
          organization,
          team,
        },
        group: ['userid'],
        order: sequelize.literal('sum DESC'),
        limit: 5,
      })

      totalHours = await db.tracker_data.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('duration')), 'total']],
        where: {
          organization,
          team,
        },
      })
    }

    let dataArr = []

    for (let i of data) {
      const id = i.userid

      await db.team_user
        .findByPk(id)
        .then((user) => {
          dataArr.push({ ...i.dataValues, fullName: user.fullName })
        })
        .catch((error) => next(error))
    }

    activeHours = {
      totalHours,
      dataArr,
    }

    res.status(200).send(activeHours)
  } catch (error) {
    next(error)
  }
})

const getProductiveHours = asyncHandler(async (req, res, next) => {
  try {
    const { organization, team } = req.params

    let data
    let productiveHours
    let totalHours

    if (team === 'All Teams') {
      data = await db.tracker_data.findAll({
        attributes: [
          'userid',
          [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
          [sequelize.fn('count', sequelize.col('duration')), 'count'],
        ],
        where: {
          organization,
          type: 'Productive',
        },
        group: ['userid'],
        order: sequelize.literal('sum DESC'),
        limit: 5,
      })

      totalHours = await db.tracker_data.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('duration')), 'total']],
        where: {
          organization,
          type: 'Productive',
        },
      })
    } else {
      data = await db.tracker_data.findAll({
        attributes: [
          'userid',
          [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
          [sequelize.fn('count', sequelize.col('duration')), 'count'],
        ],
        where: {
          organization,
          type: 'Productive',
          team,
        },
        group: ['userid'],
        order: sequelize.literal('sum DESC'),
        limit: 5,
      })

      totalHours = await db.tracker_data.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('duration')), 'total']],
        where: {
          organization,
          type: 'Productive',
          team,
        },
      })
    }

    let dataArr = []

    for (let i of data) {
      const id = i.userid

      await db.team_user
        .findByPk(id)
        .then((user) => {
          dataArr.push({ ...i.dataValues, fullName: user.fullName })
        })
        .catch((error) => next(error))
    }

    productiveHours = {
      totalHours,
      dataArr,
    }

    res.status(200).send(productiveHours)
  } catch (error) {
    next(error)
  }
})

module.exports = { getActiveHours, getProductiveHours }
