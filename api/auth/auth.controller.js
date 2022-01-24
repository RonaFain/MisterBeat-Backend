const authService = require('./auth.service')
const logger = require('../../services/logger.service')

module.exports = {
  login,
  signup,
  logout,
}

async function login(req, res) {
  const { userName, password } = req.body
  try {
    const user = await authService.login(userName, password)
    req.session.user = user
    res.json(user)
  } catch (err) {
    logger.error('Failed to Login ' + err)
    res.status(499).send({ err: 'Failed to Login' })
  }
}

async function signup(req, res) {
  try {
    const { userName, password, imgUrl } = req.body
    const account = await authService.signup(
      userName,
      password,
      imgUrl
    )
    logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
    const user = await authService.login(userName, password)
    req.session.user = user
    res.json(user)
  } catch (err) {
    logger.error('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req, res) {
  try {
    // req.session.destroy()
    req.session.user = null
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
}
