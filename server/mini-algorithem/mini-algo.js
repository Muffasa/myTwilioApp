
var Weather = require("weather");
var campains = require("../campains");
var user_profiles = require("../user_profiles");
var algo = {};

algo.getCampainUrl = function (callMaker){

    var result = process.env.BASE_URL;

  if(!callMaker){
    return returnDefaultUrl();
    }

  user_profiles.forEach(function (profile){
    if(profile.name == callMaker.name && profile.campain){
      return profile.campain.getUrl(campain,caller_temperature,caller_language);
    };
  });




/////////// realtime user

///check if user is in aroma radius

if(getDistance(callMaker.location,campains.AromaTelAviv.getLocation(campains.AromaTelAviv))<=
campains.AromaTelAviv.optional_params.target_erea['radius']){
    return campains.AromaTelAviv.getUrl(campains.AromaTelAviv,25);//getTemperature("Tel Aviv City"));
}
else if(getDistance(callMaker.location,campains.AromaBeerSheva.getLocation(campains.AromaBeerSheva))<=
campains.AromaBeerSheva.optional_params.target_erea['radius']){
    return campains.AromaBeerSheva.getUrl(campains.AromaBeerSheva,getTemperature("Beer Sheva City"));
}
else {
  return returnDefaultUrl();
}


/*   campains.forEach(function (campain){

     campain.match_rate=0;



    if(campain.optional_params.target_erea){
      if(getDistance(callMaker.loc,campain.getLocation())<=campain.target_erea['radius']){
        campain.match_rate+=100;
        optional_campains.push(campain);
      }
    }

    if(campain.optional_params.target_age){
      if(callMaker.age>=campain.optional_params.target_age[0]&&
        callMaker.age<=campain.optional_params.target_age[1]){
          campain.match_rate+=10;
          optional_campains.push(campain);
        }
    }


  });*/



}

algo.getCampainNameByUserName = function(caller_name){
  user_profiles.forEach(function(userP){
    if(caller_name==userP.name){
      return userP.campain_name;
    }
  })
}

algo.getCampainUrlByCampainName = function(campain_name){
  campains.forEach(function(campain){
    if(campain.name==campain_name){
      return campain.getUrl();
    }
  })
}

algo.isFixedUser = function(user_profile){
  user_profiles.forEach(function(userP){
    if(user_profile==userP){
      return true;
    }
  });
  return false;

}

function returnDefaultUrl(){
  var result = process.env.BASE_URL;
  if(Math.random()*2>1){
    result+='/campain-bank/Luftanza_15s.mp3'
  }
  else {
    result+='/campain-bank/ElAl_8s.mp3'
  }
  return result;
  }


function getTemperature(city){
  Weather.getCurrent(city, function(current) {
  return current.temperature()});
};

function getDistance(loc1,loc2){
var R = 6371000; // metres
var φ1 = loc1.lat.toRadians();
var φ2 = loc2.lat.toRadians();
var Δφ = (loc2.lat-loc1.lat).toRadians();
var Δλ = (loc2.lon-loc1.lon).toRadians();

var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;

return d;

};

///////////////////////////
//Weather.getCurrent("Kansas City", function(current) {
//  console.log(
//    ["currently:",current.temperature(),"and",current.conditions()].join(" ")
//  );
//});

//Weather.getForecast("Kansas City", function(forecast) {
//  console.log("forecast high: " + forecast.high());
//  console.log("forecast low: " + forecast.low());
//});
//////////////////////////
module.exports = algo;
