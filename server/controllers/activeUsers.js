const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const { sequelize } = require('../models/index')
const { Op } = require('sequelize')

const getActiveStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  await db.tracker_data
    .findOne({
      where: {
        userid: id,
      },
      order: [['time', 'DESC']],
      limit: 1,
    })
    .then((result) => {
      res.statusCode = 200
      res.json(result)
    })
    .catch((error) => {
      next(error)
    })
})

const getActiveUsers = asyncHandler(async (req, res, next) => {
  const { organization } = req.params

  await db.tracker_data
    .findAll({
      attributes: ['userid'],
      where: {
        organization,
        [Op.and]: [sequelize.literal(`time > now() - (1*INTERVAL '5 min')`)],
      },
      group: ['userid'],
    })
    .then(async (response) => {
      const idArr = []

      response.map((x) => {
        idArr.push(x.dataValues.userid)
      })

      await db.team_user
        .findAll({
          where: {
            id: idArr,
          },
        })
        .then((result) => {
          res.statusCode = 200
          res.json(result)
        })
        .catch((error) => {
          next(error)
        })
    })
    .catch((error) => {
      next(error)
    })
})

const getInActiveUsers = asyncHandler(async (req, res, next) => {
  try {
    const { organization } = req.params

    const allUser = await db.tracker_data.findAll({
      attributes: ['userid'],
      where: {
        organization,
      },
      group: ['userid'],
    })
    const allUserArr = []
    allUser.map((x) => {
      allUserArr.push(x.dataValues.userid)
    })

    const activeUser = await db.tracker_data.findAll({
      attributes: ['userid'],
      where: {
        organization,
        [Op.and]: [sequelize.literal(`time > now() - (1*INTERVAL '5 min')`)],
      },
      group: ['userid'],
    })
    const activeArr = []
    activeUser.map((x) => {
      activeArr.push(x.dataValues.userid)
    })

    const inActiveArr = allUserArr.filter((x) => !activeArr.includes(x))

    await db.team_user
      .findAll({
        where: {
          id: inActiveArr,
        },
      })
      .then((result) => {
        res.statusCode = 200
        res.json(result)
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
})

module.exports = {
  getActiveStatus,
  getActiveUsers,
  getInActiveUsers,
}
