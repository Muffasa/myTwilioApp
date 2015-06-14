


function Campain(name,audios,budjet,PPS,PPFL){
  ///////crutial params:
  this.id;
  this.name = name;
  this.audios=audios;
  this.budjet=budjet;
  this.Pay_Per_Second=PPS;
  this.Pay_Per_Full_Listen = PPFL;

  this.optional params{
     pricing_params:{},
       /*
       Pay_Per_Extra_Details,
       extra_details_active_button,
       Pay_Per_Deal,
       deal_active_button
       */

     target_params:{},
     /*
       target_languages,
       target_gender,
       terget_age,
       target_erea
            .
            .
            current speed (driving/walking)
     */

     global_params{}
     /*
       active_at_dates, //(active days in a week,vications,hollydays...)
       active_at_local_temperatures,
       active_at_client_temperatures,

             .
             .

    */

};
  //////////////

  this.dailyUpdate = function (){

  }

  this.isAvtive = function (){
    if(this.Active==false || this.budjet<this.PPL*100){
      return false;
    }
    else {
      this.dailyUpdate()
      if( || ){
        return false;
      }
    }
  }
  this.getLocation = function (){
    return this.optional_params.target_params
  }

  this.getUrl=function (client_current_temperatur){
    if(this.audio.count==1){
      return this.audio[0];
    }
    else {
      if(temperatur>this.active_temperatures[0]||temperatur<this.active_temperatures[1]){
        return this.audio[0];
      }
      else {
        return this.audio[1];
      }
    }

  }

};

/*function PPL(timeUnit,priceUnit){
  this.timeUnit=timeUnit;
  this.priceUnit=priceUnit;

  this.TimeLine = {1:0.01,5:0.03,9:0.1};

  this.getPPL= function(caller_listen_time)
  {
    var time_om_air=caller_listen_time;

    if(this.timeUnit != 'sec'){
      time_om_air=ConvertTime(this.timeUnit);
    }

    TimeLine.forEach(function(part){

      if(time_om_air>TimeLine[TimeLine.lenth])
      {
        return TimeLine[TimeLine.lenth]
      }


    })
  }

}*/

module.exports = Campain;
