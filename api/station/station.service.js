const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById,
  remove,
  update,
  add,
}

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection('station')
    var stations = await collection.find(criteria).toArray()
    stations = stations.map((station) => {
      station.createdAt = ObjectId(station._id).getTimestamp()
      return station
    })
    return stations
  } catch (err) {
    logger.error('cannot find stations', err)
    throw err
  }
}

async function getById(stationId) {
  try {
    const collection = await dbService.getCollection('station')
    const station = await collection.findOne({ _id: ObjectId(stationId) })
    return station
  } catch (err) {
    logger.error(`while finding station ${stationId}`, err)
    throw err
  }
}

async function remove(stationId) {
  try {
    const collection = await dbService.getCollection('station')
    await collection.deleteOne({ _id: ObjectId(stationId) })
  } catch (err) {
    logger.error(`cannot remove station ${stationId}`, err)
    throw err
  }
}

async function update(station) {
  try {
    const stationToSave = {
      _id: ObjectId(station._id),
      name: station.name,
      imgUrl: station.imgUrl,
      desc: station.desc,
      createdAt: station.createdAt,
      createdBy: station.createdBy,
      tags: station.tags,
      likedByUsers: station.likedByUsers,
      songs: station.songs,
    }
    const collection = await dbService.getCollection('station')
    await collection.updateOne(
      { _id: stationToSave._id },
      { $set: stationToSave }
    )
    return stationToSave
  } catch (err) {
    logger.error(`cannot update station ${station._id}`, err)
    throw err
  }
}

async function add(station) {
  try {
    delete station._id
    const collection = await dbService.getCollection('station')
    await collection.insertOne(station)
    return station
  } catch (err) {
    logger.error('cannot insert station', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    criteria.$or = [
      {
        name: txtCriteria,
      },
      {
        genre: txtCriteria,
      },
    ]
  }
  return criteria
}
