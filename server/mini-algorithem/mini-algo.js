
var campains = require('../campains/campains');
var user_profiles = require("../user_profiles/user-profiles");
var algo = {};

algo.getCampainUrl = function (callMaker){

    var result = 'https://demo-muffasa.c9.io';

  if(!callMaker){
    return returnDefaultUrl();
    }



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



};

algo.getCampainNameByUserName = function(caller_name){
  user_profiles.forEach(function(userP){
    if(caller_name==userP.name){
      return userP.campain_name;
    }
  })
};

algo.getCampainUrlByCampainName = function(campain_name){
  
  var campain;
    for (campain in campains){
        if(campain_name==campains[campain].name){
      return campains[campain].getUrl();
    }
  }
  
  campains.forEach(function(campain){
    if(campain.name==campain_name){
      return campain.getUrl();
    }
  })
};

algo.isFixedUser = function(user_profile){
  
  
  for (var i=0;i<user_profiles.length;i++){
        if(user_profile.name==user_profiles[i].name && user_profiles[i].location.lat==user_profile.location.lat){
      return true;
    }
  }
  
  
  return false;
  /*user_profiles.forEach(function(userP){
    if(user_profile.name==userP.name && userP.location.lat==user_profile.location.lat){
      return true;
    }
  });
  return false;*/

};

function returnDefaultUrl(){
  var result = process.env.BASE_URL;
  if(Math.random()*2>1){
    result+='/campain-bank/Luftanza_15s.mp3'
  }
  else {
    result+='/campain-bank/ElAl_8s.mp3'
  }
  return result;
  };


function getTemperature(GeoLoc){
  
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        var json_res =JSON.parse(xhr.responseText);
        return json_res.base.main.temp - 273.15;
    }
  }
  
  xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?lat="+GeoLoc.lat+"&lon="+GeoLoc.lon,false);
    
  
  /*JSONRequest.get(
    "http://api.openweathermap.org/data/2.5/weather?lat="+GeoLoc.lat+"&lon="+GeoLoc.lon,
    function (requestNumber, value, exception) {
        if (value) {
            return value.base.main.temp - 273.15; //(Kelvin Celcius)
        } else {
            return 25;
        }
    }
); */

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
