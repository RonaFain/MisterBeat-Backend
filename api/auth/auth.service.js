const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

module.exports = {
  signup,
  login,
}

async function login(userName, password) {
  logger.debug(`auth.service - login with username: ${userName}`)

  const user = await userService.getByUsername(userName)
  if (!user) return Promise.reject('Invalid username or password')
  
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Invalid username or password')

  delete user.password
  user._id = user._id.toString()
  return user
}

async function signup(userName, password, imgUrl) {
  const saltRounds = 10
  logger.debug(
    `auth.service - signup with username: ${userName}`
  )
  if (!userName || !password)
    return Promise.reject('username and password are required!')

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({ userName, password: hash, imgUrl })
}
