const User = require('./user.model')
const UserService = require('./user.service')

module.exports = UserService(User)   //ส่งค่าไปที่ App.js