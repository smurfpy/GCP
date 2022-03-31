const addGoogleUser = (User) => ({ id, email, firstName, lastName, profilePhoto }) => {
  console.log(id, email, firstName, lastName, profilePhoto)

  const teacher = new User({
    id, email, firstName, lastName, profilePhoto, source: "Google"
  })
  return teacher.save()
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