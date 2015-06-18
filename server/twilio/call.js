var client = require('./client');
var logger = require('../logger/log');


var call = {};

call.triggerCall = function(to,campain_ID,callback) {
  //Place a phone call, and respond with TwiML instructions from the given URL
  
    var params = {
    to: to, // Any number Twilio can call
    from: '+97243741132',
    url: 'https://demo-muffasa.c9.io/call/'+campain_ID
  };
  
  client.makeCall(params, function(error, response) {

    // Log the response to DiskDB to auditing purposes
    if (error) {
      logger.logCall({
        "status": "error",
        "error": error
      });
    } else {
      logger.logCall({
        "status": "success",
        "response": response
      });
    }
    callback(error, response);

  });

};

module.exports = call;
