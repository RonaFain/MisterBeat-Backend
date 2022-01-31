const activitylogService = require('./activitylog.service')
const logger = require('../../services/logger.service')

module.exports = {
  getActivitieslog,
  getActivitylog,
  addActivitylog,
  updateActivitylog,
}


// backend - controller
async function getActivitieslog(req, res) {
  const filterBy = req.query
  try {
    const activitieslog = await activitylogService.query(filterBy)
    res.send(activitieslog)
  } catch (err) {
    logger.error('Failed to get activities log', err)
    res.status(500).send({ err: 'Failed to get activities log' })
  }
}

async function getActivitylog(req, res) {
  try {
    const activitylog = await activitylogService.getById(req.params.id)
    res.send(activitylog)
  } catch (err) {
    logger.error('Failed to get activity log', err)
    res.status(500).send({ err: 'Failed to get activity log' })
  }
}

async function addActivitylog(req, res) {
  try {
    const activitylog = req.body
    const addedActivitylog = await activitylogService.add(activitylog)
    res.send(addedActivitylog)
  } catch (err) {
    logger.error('Failed to add activity log', err)
    res.status(500).send({ err: 'Failed to add activity log' })
  }
}

async function updateActivitylog(req, res) {
  try {
    const activitylog = req.body
    const savedActivitylog = await activitylogService.update(activitylog)
    res.send(savedActivitylog)
  } catch (err) {
    logger.error('Failed to update activity log', err)
    res.status(500).send({ err: 'Failed to update activity log' })
  }
}
