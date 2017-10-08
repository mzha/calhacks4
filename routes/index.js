var express = require('express');
var blocktrail = require('blocktrail-sdk');
var tainted = require('../public/javascripts/taints');
var database = require('../public/javascripts/database');
const client = blocktrail.BlocktrailSDK({
  apiKey: "156a1fa3b03acca101ad45c958a8a94b58c387d5",
  apiSecret: "ace25a2fd0d37cd1527620a66b20f3f00b9f18d1",
  network: "BTC",
  testnet: true
});
var taints = {};
var finished = true;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', function(req,res, next) {
  client.address(req.body.address, function(err, address) {
    res.send(address);
  })
})

router.post('/addTainted', function(req, res, next) {
  database.addTainted(req.body.address, req.body.taint, function() {
    res.send("done");
  });
})

router.post('/history', function(req, res, next) {
  finished = false;
  taints = {};
  database.getTainted(function(tainted) {
    for (var i = 0; i < tainted.length; i++) {
      taints[tainted[i].address] = tainted[i].taint;
    }
    getTaint(req.body.address, function(taint) {
      finished = true;
      taint = taint.toFixed(2);
      res.end(taint * 100 + "");
    });
  })
})

function getTaint(address, callback) {
  console.log(address);
  if (finished) {
    return;
  }
  if (taints[address] != null) {
    console.log("EXISTS");
    callback(taints[address]);
    return;
  }
  var page = 0;
  var taint = 0;
  client.addressTransactions(
    address,
    {page: page, limit: 200, sort_dir: "desc"},
    function(err, addressTxs) {
      if (err || !addressTxs.data) {
        callback(0);
        return;
      }
      for (var i = 0; i < addressTxs.data.length; i++) {
        var date = new Date();
        var now = date.getTime();
        var date2 = new Date(addressTxs.data[i].time);
        var transactionTime = date2.getTime();
        if (now - transactionTime > 86400000) {
          break;
        }
        var inputs = addressTxs.data[i].inputs;
        var paidToUser = true;
        var inputTaint = 0;
        // for (var j = 0; j < inputs.length; j++) {
        if (inputs[0].address == address) {
          paidToUser = false;
          // break;
        }
        // if (taints[inputs[j].address] != null) {
        //   inputTaint += taints[inputs[j].address];
        // } else {
        //   inputTaint += 0.5;
        // }
        if (paidToUser) {
          getTaint(inputs[0].address, function(temp) {
            inputTaint += temp;
            // inputTaint = inputTaint / inputs.length;
            if (addressTxs.data[i]) {
              var outputs = addressTxs.data[i].outputs;
              for (var j = 0; j < outputs.length; j++) {
                if (outputs[j].address == address) {
                  taint += inputTaint * outputs[j].value;
                }
              }
              client.address(address, function(err, address) {
                if (address.received == 0) {
                  taint = 0;
                } else {
                  taint = taint / address.received;
                }
                taints[address] = taint;
                callback(taint);
                return;
              });
            } else {
              callback(0);
              return;
            }
          });
        }
        // }
      }
    }
  );
}

module.exports = router;
