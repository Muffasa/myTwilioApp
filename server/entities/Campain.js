


function Campain(name,campain_audio,budget,PPS,PPFL){
  ///////crutial params:
  this.id;
  this.Name = name;
  this.Active=true;
  this.Audio=campain_audio;
  this.budget=budget;
  this.Pay_Per_Second=PPS;
  this.Pay_Per_Full_Listen = PPFL;

  this.optional_params={
     pricing_params:{
       Extra_Deatles:{
         
       },
       Deal:{
         
       }
     },

     target_params:{
     
       target_gender:'',
       terget_age:'',
       target_erea:'',
       TPetc:''
           // .
           // .
           // current speed (driving/walking)
     },

     global_params:{
     
       active_at_dates:'', 
       active_at_local_temperatures:'',
       active_at_client_temperatures:'',
       GPetc:''
             
    }

};
  //////////////

  Campain.prototype.dailyUpdate = function (){

  };

  Campain.prototype.isAvtive = function (){
    if(this.Active==false || this.budjet<this.PPL*100){
      return false;
    }
    else {
      return true;
    }
  };
  Campain.prototype.getLocation = function (){
    return this.optional_params.target_params.target_erea.Location;
  }

  Campain.prototype.getAudio=function (){
    
    return this.Audio.AudioFile;

  }

};



module.exports = Campain;
