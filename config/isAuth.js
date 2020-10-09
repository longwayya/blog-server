const jwt = require("jsonwebtoken")

const user = require('./user')
const key = "longway"

function isAdmin(username, password) {
  if (username === user.name && password === user.password) {
    return true
  } else {
    return false
  }
}
const token = jwt.sign({ user: "longway", exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, key)

function isAuth(token) {
  try {
    let decode = jwt.verify(token, key)
    return true
  } catch (error) {
    return false
  }
}
module.exports = { isAdmin, token, isAuth }