var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taintedSchema = new Schema({
  address: String,
  taint: Number
});

var Tainted = mongoose.model('Tainted', taintedSchema);

module.exports = Tainted;
