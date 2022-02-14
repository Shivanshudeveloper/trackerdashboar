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
  deleteReport,
  getReportById,
} = require('../controllers/reports')

const {
  gettingActiveHoursOfTeam,
  saveApplicationType,
  getApplicationType,
  deleteApplicationType,
} = require('../controllers/timesheets')

const {
  createOrganization,
  getOrganizationDetail,
  updateOrganization,
} = require('../controllers/organization')

const {
  getActiveHours,
  getProductiveHours,
} = require('../controllers/leaderboard')

const {
  createCategory,
  getCategories,
  updateCategoryAndApps,
  getAllApps,
} = require('../controllers/appCategory')

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
router.get('/report/:id', getReportById)
router.delete('/report/delete/:id', deleteReport)

// ****************** TIMESHEETS ******************* //

router.post('/applicationType/create', saveApplicationType)
router.get('/activeHours/:organization/:team', gettingActiveHoursOfTeam)
router.get('/applicationType/:organization', getApplicationType)
router.delete('/applicationType/delete/:id', deleteApplicationType)

// ****************** Organization ******************* //
router.post('/organization/create', createOrganization)
router.get('/organization/:organization', getOrganizationDetail)
router.put('/organization/update', updateOrganization)

// ****************** Leaderboard ******************* //
router.get('/leaderboard/activeHours/:organization/:team', getActiveHours)
router.get(
  '/leaderboard/productiveHours/:organization/:team',
  getProductiveHours
)

// ****************** Category & APP ******************* //
router.post('/category/create', createCategory)
router.get('/category/:organization', getCategories)
router.put('/category/update', updateCategoryAndApps)

router.get('/app/:organization', getAllApps)

module.exports = router
