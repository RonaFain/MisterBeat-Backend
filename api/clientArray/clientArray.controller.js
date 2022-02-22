const clientArrayService = require('./clientArray.service');
const logger = require('../../services/logger.service');

module.exports = {
  // getclientArrays,
  // getclientArray,
  addclientArray,
  // updateclientArray,
  // removeclientArray,
};

async function addclientArray(req, res) {
  console.log('req.body hahahhaahah', req.body);
  try {
    const clientArray = req.body;
    const addedclientArray = await clientArrayService.add(clientArray);
    res.send(addedclientArray);
  } catch (err) {
    logger.error('Failed to add clientArray', err);
    res.status(500).send({ err: 'Failed to update clientArray' });
  }
}

// async function getclientArrays(req, res) {
//   try {
//     const filterBy = {
//       txt: req.query?.userid || '',
//     };
//     console.log('req.query', req.query);
//     console.log('filterBy', filterBy);
//     const clientArrays = await clientArrayService.query(filterBy);
//     res.send(clientArrays);
//   } catch (err) {
//     logger.error('Failed to get clientArrays', err);
//     res.status(500).send({ err: 'Failed to get clientArrays' });
//   }
// }

// async function getclientArray(req, res) {
//   try {
//     const clientArray = await clientArrayService.getById(req.params.id);
//     res.send(clientArray);
//   } catch (err) {
//     logger.error('Failed to get clientArray', err);
//     res.status(500).send({ err: 'Failed to get clientArray' });
//   }
// }

// async function updateclientArray(req, res) {
//   try {
//     const clientArray = req.body;
//     const savedclientArray = await clientArrayService.update(clientArray);
//     res.send(savedclientArray);
//   } catch (err) {
//     logger.error('Failed to update clientArray', err);
//     res.status(500).send({ err: 'Failed to update clientArray' });
//   }
// }

// async function removeclientArray(req, res) {
//   try {
//     await clientArrayService.remove(req.params.id);
//     res.send({ msg: 'Deleted successfully' });
//   } catch (err) {
//     logger.error('Failed to delete clientArray', err);
//     res.status(500).send({ err: 'Failed to delete clientArray' });
//   }
// }
