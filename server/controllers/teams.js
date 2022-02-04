const db = require('../models/index')
const asyncHandler = require('express-async-handler')

const addTeamsOfOrganization = asyncHandler(async (req, res, next) => {
  const { teamNames, organization } = req.body
  const time = new Date().getTime()

  try {
    for (let i of teamNames) {
      const isExist = await db.teams.findOne({
        where: { organization, team_name: i },
      })

      if (isExist) {
        res.statusCode = 400
        res.json({ message: `Team ${i} already exist` })
        return
      }

      await db.teams.create({
        team_name: i,
        organization,
        time,
      })
    }

    res.statusCode = 200
    res.json({ success: 'Teams added successfully' })
  } catch (error) {
    next(error)
  }
})

const getTeamsOfOrganization = asyncHandler(async (req, res, next) => {
  const { organization } = req.params

  await db.teams
    .findAll({ where: { organization } })
    .then((response) => {
      res.statusCode = 200
      res.json(response)
    })
    .catch((error) => next(error))
})

module.exports = { addTeamsOfOrganization, getTeamsOfOrganization }
