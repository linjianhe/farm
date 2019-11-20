const jwt = require('jsonwebtoken')
const token = {
  encrypt(data, time) {
    return jwt.sign(data, 'token', { expiresIn: time })
  },
  decrypt(token) {
    try {
      let data = jwt.verify(token, 'token')
      return {
        token: true,
        id: data.id
      }
    } catch (e) {
      return {
        token: false,
        data: e
      }
    }
  }
}

module.exports = token
