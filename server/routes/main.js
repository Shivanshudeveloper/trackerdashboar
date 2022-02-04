const express = require('express')
const router = express.Router()

const {
  registerToFusionauth,
  loginToFusionauth,
  logoutFromFusionauth,
  registerToPostgres,
  getAdminOfOrganization,
  updateOrganizationOfAdmin,
} = require('../controllers/admins')

const {
  addTeamsOfOrganization,
  getTeamsOfOrganization,
} = require('../controllers/teams')

const {
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
} = require('../controllers/teamUsers')

const {
  createReport,
  getReportsOfTypeofOrganization,
} = require('../controllers/reports')

const {
  gettingActiveHoursOfTeam,
  saveApplicationType,
  getApplicationType,
  deleteApplicationType,
} = require('../controllers/timesheets')

// *************** ADMINS *************** //

router.post('/register', registerToFusionauth)
router.post('/login', loginToFusionauth)
router.post('/admin/register', registerToPostgres)
router.get('/logout', logoutFromFusionauth)
router.get('/admin/:organization', getAdminOfOrganization)
router.put('/admin/update', updateOrganizationOfAdmin)

// ****************** TEAMS ******************* //

router.post('/team/create', addTeamsOfOrganization)
router.get('/getTeams/:organization', getTeamsOfOrganization)

// *************** TEAM USERS *************** //

router.post('/teamUser/create', addUsers)
router.post('/teamUser/login', teamAdminLogin)
router.post('/teamUser/update', updateUser)
router.post('/teamUser/updatePassword', updateTeamAdminPassword)
router.post('/teamUser/validate', validateTeamAdmin)
router.get('/teamUser/:id', getUserDetailById)
router.get('/teamUsers/:organization', getAllUserOfOrganization)
router.get('/teamUsersByGroup/:organization', getAllUserByTeam)
router.get('/teamUsers/:organization/:team', getUserByTeamAndOrganization)
router.delete('/teamUser/delete/:id', deleteTeamUser)

// ******************* REPORTS ********************* //

router.post('/report/create', createReport)
router.get('/report/:organization/:type', getReportsOfTypeofOrganization)

// ****************** TIMESHEETS ******************* //

router.post('/applicationType/create', saveApplicationType)
router.get('/activeHours/:organization/:team', gettingActiveHoursOfTeam)
router.get('/applicationType/:organization', getApplicationType)
router.delete('/applicationType/delete/:id', deleteApplicationType)

module.exports = router
