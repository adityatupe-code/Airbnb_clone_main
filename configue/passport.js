const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const { use } = require('passport');
const passport = require("passport");
const { MongoClient } = require('mongodb');
//const {users}=require("./database")






//google STrategy confifuration.
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Connect to MongoDB
    const client = new MongoClient('mongodb+srv://adityatupe25at:newhaibhai@adityacode.dbctto5.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  
    try {
      const db = client.db('sample_airbnb');
      const users = db.collection('users');
      const existingUser = await users.findOne({ googleId: profile.id });
  
      if (existingUser) {
        // User already exists, login
        done(null, existingUser);
      } else {
        // Create new user and login
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        };
  
        await users.insertOne(newUser);
        done(null, newUser);
      }
    } catch (err) {
      done(err);
    } finally {
      // Disconnect from MongoDB
      await client.close();
    }
      }
));
    

// //Set up passport session management
// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// // Deserialize user from session
// passport.deserializeUser(async (id, done) => {
//   // Connect to MongoDB
//   const client = new MongoClient('mongodb+srv://stacky_Ashish:Ashish2000@mongodbtutorial.0jpucuu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
//   await client.connect();

//   try {
//     const db = client.db('sample_airbnb');
//     const users = db.collection('users');
//     const user = await users.findOne({ _id: id });

//     if (user) {
//       done(null, user);
//     } else {
//       done(null, false);
//     }
//   } catch (err) {
//     done(err);
//   } finally {
//     // Disconnect from MongoDB
//     await client.close();
//   }
// });



//Passport jwt strategy configuration.
// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWTSECRET;

// passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  
//   const email = jwt_payload?.email;
//   const fullName = jwt_payload?.fullName;

//   const userExists = users.some((user) => {
//      user.email === email;
//    return done(null, user)
//   });
//   console.log(userExists)
//   if (!userExists) {
//   return done(new Error("Invalid User"), false);
//   }
  
//   return done(null, {email,fullName});




    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
//}));
