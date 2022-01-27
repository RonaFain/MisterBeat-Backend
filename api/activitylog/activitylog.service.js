const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById,
  add,
  update,
}

async function query() {
  try {
    const collection = await dbService.getCollection('activitylog')
    return await collection.find().toArray()
  } catch (err) {
    logger.error('cannot find activities log', err)
    throw err
  }
}

async function getById(activitylogId) {
  try {
    const collection = await dbService.getCollection('activitylog')
    const activitylog = await collection.findOne({
      _id: ObjectId(activitylogId),
    })
    return activitylog
  } catch (err) {
    logger.error(`while finding activity log ${activitylogId}`, err)
    throw err
  }
}

async function add(activitylog) {
  try {
    const activitylogToAdd = {
      type: activitylog.type,
      createdBy: {
        _id: activitylog.createdBy._id,
        userName: activitylog.createdBy.userName,
        imgUrl: activitylog.createdBy.imgUrl,
      },
      isRead: false,
      createdAt: Date.now(),
      stationInfo: activitylog.stationInfo,
      songTitle: activitylog.songTitle,
    }
    const collection = await dbService.getCollection('activitylog')
    await collection.insertOne(activitylogToAdd)
    return activitylogToAdd
  } catch (err) {
    logger.error('cannot insert activity log', err)
    throw err
  }
}

async function update(activitylog) {
  try {
    const activitylogToSave = {
      _id: ObjectId(activitylog._id),
      type: activitylog.type,
      createdBy: {
        _id: activitylog.createdBy._id,
        userName: activitylog.createdBy.fullname,
        imgUrl: activitylog.createdBy.imgUrl,
      },
      isRead: true,
      stationInfo: activitylog.stationInfo,
      createdAt: activitylog.createdAt,
      songTitle: activitylog.songTitle,
    }
    const collection = await dbService.getCollection('activitylog')
    await collection.updateOne(
      { _id: activitylogToSave._id },
      { $set: activitylogToSave }
    )
    return activitylogToSave
  } catch (err) {
    logger.error(`cannot update activity log ${activitylog._id}`, err)
    throw err
  }
}
