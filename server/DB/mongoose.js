const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log(`DB Connected : ${connection.connection.host}`);
    });
    console.log(`DB Connected : ${connection.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};
module.exports = connectDB;
