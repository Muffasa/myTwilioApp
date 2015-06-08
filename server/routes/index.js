var express = require('express');
var router = express.Router();

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
  var camp=req.campain;
  
  if (!call || !call.to) {
    resp.status = "error";
    resp.message = "invalid data";
    res.json(resp);
  }

  var twClient = require('../twilio/call').triggerCall(call.to, function(error, response) {
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

router.post('/call/:id', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();

  var options = {
    voice: 'woman',
    language: 'en-gb'
  };

//  twiml.say('Hello! And welcome to the Twilio App..', options);

  twiml.say('Hello Alon! And welcome to the money tunes demo App, maybe now that you hear how I speak, you will understand why i cant deliver a campain?', options);
  // The id will help you customize the response per user. This was set in 
  // Trigger call > call.js while trigerring the call 

  if (req.params.id == '1') {
    twiml
      .say('Alon')
      .say('this is Ohad, now you will hear a pir-so-met')
//      .say('if you want to stop the pir-so-met, press 5')
     // .play('http://46.101.148.83:3000/magic-chime-01.mp3') /** http://www.soundjay.com **/
      .play('http://46.101.148.83:3000/toster.mp3') /** http://www.soundjay.com **/
  } else {
    twiml
      .say('Waaaasssupppp!!')
      .say('Now you will hear a sound', options)
      .play('46.101.148.83/magic-chime-02.mp3') /** http://www.soundjay.com **/
      .say('Yaaaayyyy!!', options);
  }

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
});



router.post('/incoming', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();


  twiml.say('dont fucking mess with me bitch');


  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
});

module.exports = router;
