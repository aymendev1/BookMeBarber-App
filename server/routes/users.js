const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const Employee = require("../models/employeeSchema");
const passport = require("passport");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../middleware/auth");

router.post("/signup", (req, res, next) => {
  // Verify that first name is not empty
  if (!req.body.EmployeeEmail || !req.body.Password) {
    res.statusCode = 500;
    res.send({
      name: "Data Entry Error",
      message: "Please check the Data Entry",
    });
  } else {
    Employee.findOne({ email: req.body.EmployeeEmail }, function (err, result) {
      if (!err) {
        const EmpId = result.employeeID;
        User.register(
          new User({
            UserLoginID: EmpId,
            username: req.body.EmployeeEmail,
          }),
          req.body.Password,
          (err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send({ message: "Registration Failed", info: err });
            } else {
              const token = getToken({ _id: user._id });
              const refreshToken = getRefreshToken({ _id: user._id });
              user.refreshToken.push({ refreshToken });
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send({ message: "Registration Failed", info: err });
                } else {
                  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                  res.statusCode = 200;
                  res.send({ success: true, token });
                }
              });
            }
          }
        );
      } else if (err) {
        res.statusCode = 500;
        res.send({ message: "User Not Found", info: err });
      }
    });
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
          res.sendStatus(500).send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      });
    },
    (err) => {
      res.sendStatus(500).send("Password error");
    }
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
              res.send("Unauthorized here");
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
      res.send("Unauthorized " + err.message);
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});
router.get("/user", verifyUser, (req, res, next) => {
  // Reading the userID from the req and returning the user
  const userID = req.user.UserLoginID;
  Employee.findOne({ employeeID: userID }, function (err, user) {
    if (!err) {
      res.send(user);
    } else {
      res.send(err.message);
    }
  });
});
router.post("/passUpdate", (req, res, next) => {
  const { email, Password } = req.body;
  User.findByUsername(email).then(
    function (sanitizedUser) {
      if (sanitizedUser) {
        sanitizedUser.setPassword(Password, function () {
          sanitizedUser.save();
          console.log("Password Changed");
          res.status(200).send("Password Changed");
        });
      } else {
        res.status(400);
      }
    },
    function (err) {
      res.send(err.message);
    }
  );
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
