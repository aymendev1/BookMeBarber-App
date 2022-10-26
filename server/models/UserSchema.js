const mongoose = require("mongoose");
const findOrCreate = require("mongoose-find-or-create");
const passportLocalMongoose = require("passport-local-mongoose");
const Session = new mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});
const UserSchema = new mongoose.Schema({
  UserLoginID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: [Session],
  },
});
UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
module.exports = UserLogin = mongoose.model("usersLogin", UserSchema);
