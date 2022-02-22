const express = require('express');
const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const {
  // getclientArrays,
  // getclientArray,
  addclientArray,
  // updateclientArray,
  // removeclientArray,
} = require('./clientArray.controller');
const router = express.Router();

router.post('/', addclientArray);
// router.get('/', log, getclientArrays);
// router.get('/:id', getclientArray);
// router.put('/:toyId',requireAuth, updateclientArray)
// router.delete('/:toyId',requireAuth, removeclientArray)
// router.put('/:id', updateclientArray);
// router.delete('/:id', removeclientArray);

module.exports = router;
