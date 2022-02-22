const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getStations, getStation, addStation, updateStation, removeStation } = require('./station.controller')
const router = express.Router()

router.get('/', log, getStations)
router.get('/:id', getStation)
router.post('/', addStation)
// router.put('/:toyId',requireAuth, updateStation)
// router.delete('/:toyId',requireAuth, removeStation)
router.put('/:id', updateStation)
router.delete('/:id', removeStation)

module.exports = router