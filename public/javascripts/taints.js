var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Tainted = require('../../models/tainted');

Tainted.find(function (err, tainteds) {
  module.exports = tainteds;
})

// module.exports = [
//   "2MvRuXQK5S5ZeN82xnvQvaP3Ec8H8hfaGkz",
//   "2NFruXh7znvrjPwCwUasfs46S4KGsfSGbnk"
// ]
