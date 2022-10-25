const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // Check against the DB only if necessary.
    // This can be avoided if you don't want to fetch user details in each request.
    User.findOne({ _id: jwt_payload._id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

//
//module.exports = function (passport) {
//  passport.use(
//    new LocalStrategy(function (email, password, done) {
//      User.findOne({ email: email }, async function (err, user) {
//        if (err) {
//          console.log("ERROR " + err.message);
//          return done(err);
//        }
//        if (!user) {
//          console.log("User not found");
//          return done(null, false, { message: "User not found" });
//        }
//        bcrypt.compare(password, user.password, (err, result) => {
//          if (err) throw err;
//          if (result === true) {
//            return done(null, user);
//          } else {
//            return done(null, false);
//          }
//        });
//      });
//    })
//  );
//  passport.serializeUser((user, done) => {
//    done(null, user._id);
//  });
//  passport.deserializeUser((id, done) => {
//    User.findOne({ _id: id }, function (err, user) {
//      const userInformation = {
//        email: user.email,
//      };
//      return done(err, userInformation);
//    });
//  });
//};
//
