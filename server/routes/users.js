const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const passport = require("passport");

function GenerateUserLoginID() {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var Numbers = "1234567890";
  var charactersLength = characters.length;
  var NumbersLength = Numbers.length;
  for (var i = 0; i < 5; i++) {
    if (i <= 2) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += Numbers.charAt(Math.floor(Math.random() * NumbersLength));
  }
  return result;
}

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../middleware/auth");

router.post("/signup", (req, res, next) => {
  console.log({
    UserLoginId: GenerateUserLoginID(),
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    username: req.body.username,
  });
  // Verify that first name is not empty
  if (!req.body.email || !req.body.password || !req.body.role) {
    res.statusCode = 500;
    res.send({
      name: "Data Entry Error",
      message: "Please check the Data Entry",
    });
  } else {
    User.register(
      new User({
        UserLoginID: GenerateUserLoginID(),
        email: req.body.email,

        role: req.body.role,
        username: req.body.username,
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          console.log("500");
          res.send(err);
        } else {
          //user.email = req.body.email;
          //user.role = req.body.role || "";
          //user.username = req.body.username;
          //user.password = String(req.body.password);
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              console.log("5002");
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      }
    );
  }
});
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      });
    },
    (err) => next(err)
  );
});

//...

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});
router.get("/user", verifyUser, (req, res, next) => {
  res.send(req.user);
});
router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
});
// ...
// ...
module.exports = router;
