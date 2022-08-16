const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const { sequelize } = require('../models/index')
const { Op } = require('sequelize')

const gettingActiveHoursOfTeam = asyncHandler(async (req, res, next) => {
  try {
    const { organization, team } = req.params

    let teamMember = []

    if (team === 'All Teams') {
      teamMember = await db.team_user.findAll({
        where: { organization, role: 'Team Member' },
      })
    } else {
      teamMember = await db.team_user.findAll({
        where: { organization, role: 'Team Member', team },
      })
    }

    const dataArr = []

    for (let user of teamMember) {
      const activeData = await db.tracker_data.findAll({
        attributes: [
          'userid',
          [sequelize.literal(`time_bucket('1 week', time)`), 'bucket'],
          [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
          [sequelize.fn('count', sequelize.col('duration')), 'count'],
        ],
        where: {
          organization,
          [Op.and]: [
            sequelize.literal(`time > now() - (1*INTERVAL '1 month')`),
          ],
          userid: user.id,
        },
        group: ['userid', 'bucket'],
      })

      let data = {
        team: user.team,
        activeData,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      }

      dataArr.push(data)
    }
    res.status(200).send(dataArr)
  } catch (error) {
    next(error)
  }
})

const getProductiveHourOfTeam = asyncHandler(async (req, res, next) => {
  try {
    const { organization, team } = req.params

    console.log(team)

    let teamMember = []

    if (team === 'All Teams') {
      teamMember = await db.team_user.findAll({
        where: { organization, role: 'Team Member' },
      })
    } else {
      teamMember = await db.team_user.findAll({
        where: { organization, role: 'Team Member', team },
      })
    }

    const dataArr = []

    for (let user of teamMember) {
      const productiveData = await db.tracker_data.findAll({
        attributes: [
          'userid',
          [sequelize.literal(`time_bucket('1 day', time)`), 'bucket'],
          [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
          [sequelize.fn('count', sequelize.col('duration')), 'count'],
        ],
        where: {
          organization,
          [Op.and]: [sequelize.literal(`time > now() - (1*INTERVAL '6 days')`)],
          userid: user.id,
          type: 'Productive',
        },
        group: ['userid', 'bucket'],
      })

      let data = {
        team: user.team,
        productiveData,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      }

      dataArr.push(data)
    }

    res.status(200).send(dataArr)
  } catch (error) {
    next(error)
  }
})

const saveApplicationType = asyncHandler(async (req, res, next) => {
  try {
    const { appList } = req.body
    const list = []
    for (let app of appList) {
      const data = await db.app_type.create(app)
      list.push(data)
    }

    res.statusCode = 200
    res.json(list)
  } catch (error) {
    next(error)
  }
})

const getApplicationType = asyncHandler(async (req, res) => {
  const { organization } = req.params
  await db.app_type
    .findAll({ where: { organization } })
    .then((apps) => {
      res.statusCode = 200
      res.json(apps)
    })
    .catch((error) => next(error))
})

const deleteApplicationType = asyncHandler(async (req, res) => {
  const { id } = req.params
  await db.app_type
    .destroy({ where: { id } })
    .then(() => res.status(200).send('Successfully Deleted'))
    .catch((error) => next(error))
})

module.exports = {
  gettingActiveHoursOfTeam,
  getProductiveHourOfTeam,
  saveApplicationType,
  getApplicationType,
  deleteApplicationType,
}
