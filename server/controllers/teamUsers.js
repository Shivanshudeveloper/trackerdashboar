const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const addUsers = asyncHandler(async (req, res, next) => {
  const { teamUsers } = req.body
  const time = new Date().getTime()

  try {
    for (let i of teamUsers) {
      const user = await db.team_user.findOne({ where: { email: i.email } })

      if (user) {
        res.statusCode = 400
        res.json({ message: `Email already exist: ${i.email}` })
        return
      }

      await db.team_user.create({
        id: i.id,
        fullName: i.name || i.fullName,
        email: i.email,
        password: i.password,
        organization: i.organization,
        team: i.team,
        role: i.role,
        trackingMode: i.trackingMode,
        trackOn: i.trackOn,
        trackBetween: i.trackBetween,
        profilePicture: i.profilePicture,
        sharableLink: i.sharableLink,
        isVerified: i.isVerified,
        time: time,
      })
    }
    res.statusCode = 200
    res.json({ message: 'Users added successfully' })
  } catch (error) {
    next(error)
  }
})

const teamAdminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  await db.team_user
    .findOne({ where: { email } })
    .then(async (user) => {
      if (user === null) {
        throw new Error('User not found')
      }

      if (!user.isVerified) {
        throw new Error('User is not verified')
      }

      await bcrypt
        .compare(password, user.dataValues.password)
        .then((macth) => {
          if (macth) {
            res.statusCode = 200
            res.json(user)
          } else {
            throw new Error('Password do not match')
          }
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

const updateUser = asyncHandler(async (req, res, next) => {
  const { id, data } = req.body
  await db.team_user
    .findByPk(id)
    .then(async (user) => {
      const newData = {
        fullName: data.fullName || user.fullName,
        email: data.email || user.email,
        organization: data.organization || user.organization,
        team: data.team || user.team,
        role: data.role || user.role,
        trackingMode: data.trackingMode || user.trackingMode,
        trackOn: data.trackOn || user.trackOn,
        trackBetween: data.trackBetween || user.trackBetween,
        profilePicture: data.profilePicture || user.profilePicture,
        sharableLink: data.sharableLink || user.sharableLink,
      }

      await db.team_user
        .update(newData, { where: { id } })
        .then(() => {
          res.statusCode = 200
          res.json('user updated successfully')
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

const updateTeamAdminPassword = asyncHandler(async (req, res, next) => {
  const { id, password } = req.body

  await db.team_user
    .findByPk(id)
    .then(async (user) => {
      if (!user.isVerified) {
        throw new Error('You cannot change password since user is not verified')
      }

      const salt = await bcrypt.genSalt(10).catch((error) => next(error))
      const hashPassword = await bcrypt
        .hash(password, salt)
        .catch((error) => next(error))

      const newData = {
        password: hashPassword,
      }

      await db.team_user
        .update(newData, { where: { id } })
        .then(() => {
          res.statusCode = 200
          res.json('Password updated successfully')
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

const validateTeamAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.body

  await db.team_user
    .findByPk(id)
    .then(async (user) => {
      if (user === null || !user) {
        throw new Error('User not found')
      }

      if (user.role === 'Team Admin') {
        const newData = {
          isVerified: true,
        }

        await db.team_user
          .update(newData, { where: { id } })
          .then(() => {
            res.statusCode = 200
            res.json(user)
          })
          .catch((error) => next(error))
      } else {
        throw new Error('Team Member are not allowed')
      }
    })
    .catch((error) => next(error))
})

const getUserDetailById = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  await db.team_user
    .findByPk(id)
    .then((user) => {
      if (user === null || !user) {
        throw new Error('User not found')
      } else {
        res.statusCode = 200
        res.json(user)
      }
    })
    .catch((error) => next(error))
})

const getAllUserOfOrganization = asyncHandler(async (req, res, next) => {
  const { organization } = req.params

  await db.team_user
    .findAll({ where: { organization } })
    .then((teamUsers) => {
      res.statusCode = 200
      res.json(teamUsers)
    })
    .catch((error) => next(error))
})

const getAllUserByTeam = asyncHandler(async (req, res, next) => {
  const { organization } = req.params

  await db.teams
    .findAll({ where: { organization } })
    .then(async (teams) => {
      const teamUserList = []

      for (let i of teams) {
        const data = await db.team_user.findAll({
          where: { team: i.team_name, organization },
        })

        if (data.length !== 0) {
          teamUserList.push(data)
        }
      }

      res.statusCode = 200
      res.json(teamUserList)
    })
    .catch((error) => next(error))
})

const getUserByTeamAndOrganization = asyncHandler(async (req, res, next) => {
  const { organization, team } = req.params

  await db.team_user
    .findAll({
      where: { team, organization },
    })
    .then((data) => {
      res.statusCode = 200
      res.json(data)
    })
    .catch((error) => next(error))
})

const deleteTeamUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  await db.team_user
    .destroy({ where: { id } })
    .then(() => res.status(200).send('Successfully Deleted'))
    .catch((error) => next(error))
})

module.exports = {
  addUsers,
  teamAdminLogin,
  updateUser,
  updateTeamAdminPassword,
  validateTeamAdmin,
  getUserDetailById,
  getAllUserOfOrganization,
  getAllUserByTeam,
  getUserByTeamAndOrganization,
  deleteTeamUser,
}
