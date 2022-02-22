const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
// const http = require('http');
const axios = require('axios');
const ObjectId = require('mongodb').ObjectId;
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3031/api/';

module.exports = {
  // query,
  // getById,
  // remove,
  // update,
  add,
};

async function add(num) {
  const desiredArray = _buildArray(num.number);
  log(desiredArray);
  console.log('num', num);
  console.log('num.number', num.number);
  console.log('desired array', desiredArray);
  try {
    const collection = await dbService.getCollection('clientArray');
    await collection.insertOne({ desiredArray });
    console.log('inserted ');
    return desiredArray;
  } catch (err) {
    logger.error('cannot insert desiredArray', err);
    throw err;
  }
}

function _buildArray(num) {
  const array = [];
  for (let i = num - 1; i > 0; i--) {
    array.push(i);
  }
  return array;
}

async function log(array) {
  console.log('sending to logggg- pre try', array);
  try {
    console.log('sending to logggg', BASE_URL);

    // await axios.get('http://localhost:3031/api'); works!!!!!!!!!!

    await axios.post(`${BASE_URL}logService`, array);
    // await axios.post('//localhost:3031/api/logService', { array });
    // await axios.post({ method: 'post', url: '//localhost:3031/api/logService', data: array });

    console.log('post axios');
  } catch (err) {
    console.log('error in POST to log');
  }
}

// async function query(filterBy = {}) {
//   // const criteria = _buildCriteria(filterBy)
//   let criteria;
//   if (filterBy.txt) criteria = { 'createdBy._id': filterBy.txt };
//   try {
//     const collection = await dbService.getCollection('clientArray');
//     var clientArrays = await collection.find(criteria).toArray();
//     clientArrays = clientArrays.map((clientArray) => {
//       clientArray.createdAt = ObjectId(clientArray._id).getTimestamp();
//       return clientArray;
//     });
//     return clientArrays;
//   } catch (err) {
//     logger.error('cannot find clientArrays', err);
//     throw err;
//   }
// }

// async function getById(clientArrayId) {
//   try {
//     const collection = await dbService.getCollection('clientArray');
//     const clientArray = await collection.findOne({ _id: ObjectId(clientArrayId) });
//     return clientArray;
//   } catch (err) {
//     logger.error(`while finding clientArray ${clientArrayId}`, err);
//     throw err;
//   }
// }

// async function remove(clientArrayId) {
//   try {
//     const collection = await dbService.getCollection('clientArray');
//     await collection.deleteOne({ _id: ObjectId(clientArrayId) });
//   } catch (err) {
//     logger.error(`cannot remove clientArray ${clientArrayId}`, err);
//     throw err;
//   }
// }

// async function update(clientArray) {
//   try {
//     const clientArrayToSave = {
//       _id: ObjectId(clientArray._id),
//       name: clientArray.name,
//       imgUrl: clientArray.imgUrl,
//       desc: clientArray.desc,
//       createdAt: clientArray.createdAt,
//       createdBy: clientArray.createdBy,
//       tags: clientArray.tags,
//       likedByUsers: clientArray.likedByUsers,
//       songs: clientArray.songs,
//       bcgColor: clientArray.bcgColor,
//     };
//     const collection = await dbService.getCollection('clientArray');
//     await collection.updateOne({ _id: clientArrayToSave._id }, { $set: clientArrayToSave });
//     return clientArrayToSave;
//   } catch (err) {
//     logger.error(`cannot update clientArray ${clientArray._id}`, err);
//     throw err;
//   }
// }

// function _buildCriteria(filterBy) {
//   const criteria = {};
//   if (filterBy.txt) {
//     const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
//     criteria.$or = [
//       {
//         createdBy: { _id: filterBy.txt },
//       },
//     ];
//   }
//   return criteria;
// }
