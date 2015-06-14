var express = require('express');
var router = express.Router();
var algo = require('./mini-algorithem/mini-algo');

router.post('/sendmsg', function(req, res) {
  var resp = {};
  var msg = req.body;

  if (!msg || !msg.to || !msg.text) {
    resp.status = "error";
    resp.message = "invalid data";
    res.json(resp);
  }

  var twClient = require('../twilio/message').sendMsg(msg.to, msg.text, function(error, message) {
    if (error) {
      resp.status = "error";
      resp.message = error;
    } else {
      resp.status = "success";
      resp.message = message.sid;
    }

    res.json(resp);
  });

});

router.post('/triggercall', function(req, res) {
  var resp = {};
  var call = req.body;


  if (!call || !call.to || !call.callMaker) {
    resp.status = "error";
    resp.message = "invalid data";
    res.json(resp);
  }

var fixed_user = algo.isFixedUser(call.callMaker);
var campain_url;
if(fixed_user){
  campain_url = algo.getCampainUrlByCampainName(call.callMaker.campain_url);
}
else {
  campain_url = algo.getCampainUrl(call.callMaker);
}

  var twClient = require('../twilio/call').triggerCall(call.to,campain_url, function(error, response) {
    if (error) {
      resp.status = "error";
      resp.response = error;
    } else {
      resp.status = "success";
      resp.response = response.sid;
    }

    res.json(resp);
  })

});

router.post('/call/:campain_url', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();

  twiml.play(req.params.campain_url)

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
});



router.post('/incoming/:to', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();


  twiml.say('dont fucking mess with me bitch');


  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
});

module.exports = router;
