const db = require('../models/index')
const asyncHandler = require('express-async-handler')
const { sequelize } = require('../models/index')
const { Op } = require('sequelize')
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

const getProductivityReport = asyncHandler(async (req, res, next) => {
  try {
    const { data } = req.body
    const d = []

    for (let i of data.users) {
      const resultData = await db.tracker_data.findAll({
        attributes: [
          'type',
          [sequelize.fn('sum', sequelize.col('duration')), 'value'],
        ],
        where: {
          organization: data.organization,
          team: data.team,

          userid: i.id,

          time: {
            [Op.between]: [data.startDate, data.endDate],
          },
        },
        group: ['type'],
      })

      let temp
      const arr = []

      resultData.map((item) => {
        if (item.type === 'Unproductive') {
          temp = {
            value: parseInt(item.dataValues.value),
            description: item.dataValues.type,
            color: 'red',
          }
          arr.push(temp)
        } else {
          temp = {
            value: parseInt(item.dataValues.value),
            description: item.dataValues.type,
            color: 'green',
          }
          arr.push(temp)
        }
      })

      const result = {
        fullName: i.fullName,
        profilePicture: i.profilePicture,
        data: arr,
      }

      d.push(result)
    }

    res.statusCode = 200
    res.json(d)
  } catch (error) {
    next(error)
  }
})

const getAppUsageReport = asyncHandler(async (req, res, next) => {
  try {
    const { data } = req.body

    const id = []

    data.users.forEach((x) => {
      id.push(x.id)
    })

    const resultData = await db.tracker_data.findAll({
      attributes: [
        'owner',
        [sequelize.literal(`time_bucket('1 day', time)`), 'bucket'],
        [sequelize.fn('sum', sequelize.col('duration')), 'value'],
      ],
      where: {
        organization: data.organization,
        team: data.team,
        userid: id,
        time: {
          [Op.between]: [data.startDate, data.endDate],
        },
      },
      group: ['owner', 'bucket'],
    })

    const numberOfDay = Math.ceil(
      Math.abs(new Date(data.endDate) - new Date(data.startDate)) /
        (1000 * 60 * 60 * 24)
    )

    const result = {
      days: numberOfDay,
      data: resultData,
    }

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    next(error)
  }
})

const getTimesheetReport = asyncHandler(async (req, res, next) => {
  try {
    const { data } = req.body

    const id = []

    data.users.forEach((x) => {
      id.push(x.id)
    })

    const timesheetData = await db.tracker_data.findAll({
      attributes: [
        'userid',
        [sequelize.literal(`time_bucket('1 day', time)`), 'bucket'],
        [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
        [sequelize.fn('count', sequelize.col('duration')), 'count'],
      ],
      where: {
        organization: data.organization,
        team: data.team,
        userid: id,
        time: {
          [Op.between]: [data.startDate, data.endDate],
        },
      },
      group: ['userid', 'bucket'],
    })

    const listDate = []
    const startDate = data.startDate
    const endDate = data.endDate
    const dateMove = new Date(endDate)
    let strDate = endDate

    while (strDate > startDate) {
      strDate = dateMove.toISOString().slice(0, 10)
      listDate.push(new Date(strDate))
      dateMove.setDate(dateMove.getDate() - 1)
    }

    const finalData = {
      dates: listDate,
      timesheetData,
    }

    res.status(200).send(finalData)
  } catch (error) {
    next(error)
  }
})

const getActivityReport = asyncHandler(async (req, res, next) => {
  try {
    const { data } = req.body

    const activity = {}

    for (let i of data.users) {
      const activityData = await db.tracker_data.findAll({
        attributes: [
          'userid',
          'type',
          [sequelize.fn('sum', sequelize.col('duration')), 'sum'],
        ],
        where: {
          organization: data.organization,
          team: data.team,
          userid: i.id,
          time: {
            [Op.between]: [data.startDate, data.endDate],
          },
        },
        group: ['userid', 'type'],
      })

      let temp
      const arr = []

      activityData.map((item) => {
        temp = {
          id: i.id,
          fullName: i.fullName,
          sum: parseInt(item.dataValues.sum),
          description: item.dataValues.type,
        }
        arr.push(temp)
      })

      activity[i.id] = arr
    }

    res.statusCode = 200
    res.json(activity)
  } catch (error) {
    next(error)
  }
})

const getActivityScreenshots = asyncHandler(async (req, res, next) => {
  try {
    const { data } = req.body

    const ss = {}

    for (let i of data.users) {
      const screenshots = await db.tracker_data.findAll({
        attributes: ['imgName', 'owner', 'duration', 'time'],
        where: {
          userid: i.id,
        },
      })

      const result = []

      screenshots.map((x) => {
        if (x.dataValues.imgName.length !== 0) {
          result.push(x.dataValues)
        }
      })

      ss[i.id] = result
    }

    res.statusCode = 200
    res.json(ss)
  } catch (error) {
    next(error)
  }
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
  getProductivityReport,
  getAppUsageReport,
  getActivityReport,
  getActivityScreenshots,
  getTimesheetReport,
}
