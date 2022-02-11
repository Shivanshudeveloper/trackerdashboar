const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const { sequelize } = require('../models/index')
const { Op } = require('sequelize')

const getLeaderboard = asyncHandler(async (req, res, next) => {
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
          [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
          [sequelize.fn('count', sequelize.col('duration')), 'count'],
        ],
        where: {
          organization,
          userid: user.id,
        },
        group: ['userid', 'bucket'],
        order: [[sequelize.col('sum'), 'DESC']],
        limit: 5,
      })

      let data = {
        team: user.team,
        activeData,
        fullName: user.fullName,
      }

      dataArr.push(data)
    }

    res.status(200).send(dataArr)
  } catch (error) {
    next(error)
  }
})

module.exports = { getLeaderboard }
