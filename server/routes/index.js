var express = require('express');
var router = express.Router();
var Firebase = require("firebase");
var algo = require('../mini-algorithem/mini-algo');




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
    var campain_ID;
      if(fixed_user){
      campain_ID = algo.getCampainIDByCampainName(call.callMaker.campain_name);
      }
      else {
      campain_ID = algo.getCampainIDFromUserData(call.callMaker);
      }

  var twClient = require('../twilio/call').triggerCall(call.to,campain_ID, function(error, response) {
    if (error) {
      resp.status = "error";
      resp.response = error;
    } else {
      resp.status = "success";
      resp.response = response.sid;
    }

    res.json(resp);
  });

});

router.post('/call/:campain_ID', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();

  var campain_audio_address = algo.getCampainUrlByCampainID(req.params.campain_ID);

  twiml.play(campain_audio_address)

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
});

router.get('/call/:campain_ID', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();

  var campain_audio_address = algo.getCampainUrlByCampainID(req.params.campain_ID);

  twiml.play(campain_audio_address)

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
});



router.post('/incoming/', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();


  twiml.say('dont fucking mess with me bitch').play();


  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
});

router.get('/getFixedUsers', function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  var profiles = algo.getUserProfiles();
  res.end(JSON.stringify(profiles));
});

router.get('/getCampains', function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  var campains = algo.getCampains();
  res.end(JSON.stringify(campains));
});

router.post('/outgoingCall', function(req, res) {
  
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  var caller = req.body.callMaker;
  var call_reciver_name = req.body.call_reciver_name;
  
  //var campain = algo.GetCampainByUser(caller);
  
  if(req.body.AnswerQ){
    twiml.dial(function(){
      this.queue(req.body.AnswerQ);
    });
  }
  else{
    if(req.body.PhoneNumber){
     twiml.dial(req.body.PhoneNumber)
    }
    else {
     // algo.StartCallReciverClientRinging(call_reciver_name);
      twiml.enqueue({
       waitUrl:'https://demo-muffasa.c9.io/wait'
      }, call_reciver_name +'Q')
    }
  }

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  
  res.end(twiml.toString());
  
});

router.post('/outgoingCallIonic', function(req, res) {
  
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  var caller = req.body.callFrom;
  var call_reciver_name = req.body.callTo;
  var campaignId=req.body.campaignId;
  
 
  
  if(req.body.AnswerQ){
    twiml.dial(function(){
      this.queue(req.body.AnswerQ);
    });
  }
  else{
    if(req.body.PhoneNumber){
     twiml.dial(req.body.PhoneNumber)
    }
    else {
     // algo.StartCallReciverClientRinging(call_reciver_name);
      twiml.enqueue({
       waitUrl:'https://demo-muffasa.c9.io/wait/'+campaignId
      }, call_reciver_name +'Q')
    }
  }

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  
  res.end(twiml.toString());
  
});

router.post('/wait/:campaignId', function(req, res) {
  
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  var caller_name = req.body.From.split(':')[1];
  var campaignId = req.params.campaignId;
  var campainRef = new Firebase("https://mtdemo.firebaseio.com/campaigns/"+campaignId);
  campainRef.once("value",function(snapshot){
    var campaign = snapshot.val();
     twiml.gather({
     timeout:'100',
     numDigits:'1',
     action:'https://demo-muffasa.c9.io/handleUserInput'
   },function() {
     if(campaign)
     this.play(campaign.audio.src)
   })

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  
  res.end(twiml.toString());
  })


});

router.post('/handleUserInput', function(req, res) {
  
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  var digit = req.body.Digits;

 twiml.say('money tunes user, you pressed' + digit)

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  
  res.end(twiml.toString());
});
module.exports = router;
