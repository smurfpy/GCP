const passport = require("passport");
const UserService = require('../user')
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL, //"ดึง URL Call back ของ google API จากไฟล์ env"
      clientID: process.env.CLIENT_ID,     //"ดึง Client ID ของ google API จากไฟล์ env"
      clientSecret: process.env.CLIENT_SECRET, //"ดึง Google secret ของ google API จากไฟล์ env"
    },
    async (accessToken, refreshToken, profile, done) => {
      const id = profile.id;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;
      const source = "Google";


      const currentUser = await UserService.getUserByEmail({ email })

      if (!currentUser) {                                         //กำหนดการเรียกใช้ข้อมูลของ User
        const newUser = await UserService.addGoogleUser({
          id,
          email,
          firstName,
          lastName,
          accessToken,
          refreshToken,
          profilePhoto
        })
        return done(null, newUser);
      }

      if (currentUser.source != "Google") {
        //return error
        return done(null, false, { message: `You have previously signed up with a different signin method` });
      }

      currentUser.lastVisited = new Date();
      return done(null, currentUser);
    },
    async (accessToken, refreshToken, profile, done) => {
      const id = profile.id;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;
      const source = "Google";


      const currentUser = await TeacherService.getUserByEmail({ email })

      if (!currentUser) {                                         //กำหนดการเรียกใช้ข้อมูลของ User
        const newUser = await TeacherService.addGoogleUser({
          id,
          email,
          firstName,
          lastName,
          accessToken,
          refreshToken,
          profilePhoto
        })
        return done(null, newUser);
      }

      if (currentUser.source != "Google") {
        //return error
        return done(null, false, { message: `You have previously signed up with a different signin method` });
      }

      currentUser.lastVisited = new Date();
      return done(null, currentUser);
    }
  )
);
