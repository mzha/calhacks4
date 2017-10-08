var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Tainted = require('../../models/tainted');

var database = {
  addTainted: function(address, taint, callback) {
    Tainted.where({
      address: address,
      taint: taint
    }).findOne(function (err, tainted) {
      if (!tainted) {
        var newTainted = new Tainted({
          address: address,
          taint: taint
        });
        newTainted.save(function(err) {
          callback();
        })
      }
    })
  },
  getTainted: function(callback) {
    Tainted.find(function (err, tainteds) {
      callback(tainteds);
    })
  }
};

module.exports = database;
