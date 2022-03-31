const addGoogleUser = (User) => ({ id, email, firstName, lastName,accessToken,refreshToken, profilePhoto }) => {        //เพิ่มค่า User ที่ล็อคอินผ่าน Google
  console.log(id, email, firstName, lastName,accessToken,refreshToken, profilePhoto)      //แสดง Log ข้อมูลที่ล็อคอิน

  const user = new User({                                                                     //กำหนดค่า User ใหม่ว่ามีอะไรบ้างแล้วเก้บข้อมูล
    id, email, firstName, lastName,accessToken,refreshToken, profilePhoto, source: "Google"
  })
  return user.save()
}
const getUsers = (User) => () => {
  return User.find({})
}
const getUserByEmail = (User) => async ({ email }) => {
  return await User.findOne({ email })
}
module.exports = (User) => {
  return {
    addGoogleUser: addGoogleUser(User),
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User)
  }
}