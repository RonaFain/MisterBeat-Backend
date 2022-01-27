const express = require('express')
const { getActivitieslog, getActivitylog, addActivitylog, updateActivitylog } = require('./activitylog.controller')

const router = express.Router()

router.get('/', getActivitieslog)
router.get('/:id', getActivitylog)
router.post('/', addActivitylog)
router.put('/', updateActivitylog)

module.exports = router