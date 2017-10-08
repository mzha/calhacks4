var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  token: Schema.Types.ObjectId,
  username: String,
  password: String,
  email: String,
  balance: Number
  pagesLeft: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;
