const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config({
  path: "config/.env",
});
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
const connectDB = require("./DB/mongoose");
connectDB();
require("./middleware/passport");
require("./middleware/localStaregy");
require("./middleware/auth");
app.use(passport.initialize());
app.use(passport.session());

const ReservationRoute = require("./routes/reservation");
const EmployeeRoute = require("./routes/employees");
const UsersRoute = require("./routes/users");

// Routes

app.use("/reservation", ReservationRoute);
app.use("/employee", EmployeeRoute);
app.use("/", UsersRoute);

app.listen(4000, () => {
  console.log("Server listenning ");
});
