///////units: corrency=$ , distance=meter, temperature=C;
var Campain = require('../Campain.js');

var base_url = process.env.BASE_URL+"/campain-bank/";

var GetLocation = function (campain){
  if(campain.optional_params.target_erea){
    return {lat:campain.optional_params.target_erea['lat'],lon:campain.optional_params.target_erea['lon']};
  }
  else {
    return [];
  }
}
var GetUrl = function (campain,caller_temperature){
  if(campain.audios.count==1){
    return audios[0];
  }
  else {
    if(caller_temperature>campain.optional_params.active_temperatures[0] ||
      caller_temperature<campain.optional_params.active_temperatures[1]){
      return this.audios[0];
    }
    else {
      return this.audios[1];
    }
  }

}

var campains = [

    Tosafedrin:
    {
    name:'tosafedrin Shiul_18s',
    audios: [base_url+name+'.mp3'],
    budjet: 1000,
    Pay_Per_Second: 0.005,
    Pay_Per_Full_Listen: 0.05,

    optional_params:{
    Pay_Per_Extra_Details: 0.1,
    extra_details_active_button:'*',
    target_languages: ['heb']
  },

    getLoacation:GetLocation,
    getUrl:GetUrl

   },

   NikeZoom:
   {
   name:'nike zoom_16s',
   audios: [base_url+name+'.mp3'],
   budjet: 1000,
   Pay_Per_Second: 0.005,
   Pay_Per_Full_Listen: 0.05,

   optional_params:{
   Pay_Per_Extra_Details: 0.1,
   extra_details_active_button:'*',

   target_languages: ['heb'],
   target_age: [15,45]
 },

   getLoacation:GetLocation,
   getUrl:GetUrl

  },

  ParkUtopia:
  {
  name:'Park Utopia_20s',
  audios: [base_url+name+'.mp3'],
  budjet: 1000,
  Pay_Per_Second: 0.005,
  Pay_Per_Full_Listen: 0.07,

  optional_params:{
  Pay_Per_Extra_Details: 0.1,
  Pay_Per_Deal: 3,
  extra_details_active_button:'*',
  deal_active_button:'7',

  target_languages: ['heb'],
  target_age: [18,50]
},

  getLoacation:GetLocation,
  getUrl:GetUrl

 },

 Dayatsu:
 {
 name:'dayatsu_14s',
 audios: [base_url+name+'.mp3'],
 budjet: 1000,
 Pay_Per_Second: 0.005,
 Pay_Per_Full_Listen: 0.05,

 optional_params:{
 Pay_Per_Extra_Details: 0.1,
 Pay_Per_Deal: 10,
 extra_details_active_button:'*',
 deal_active_button:'7',

 target_languages: ['heb'],
 target_age: [18,50]
 },

 getLoacation:GetLocation,
 getUrl:GetUrl

},

 Horziza:
 {
 name:'Vodka Horziza_6s',
 audios: [base_url+name+'.mp3'],
 budjet: 1000,
 Pay_Per_Second: 0.005,
 Pay_Per_Full_Listen: 0.025,

 optional_params:{
 Pay_Per_Extra_Details: 0.1,
 extra_details_active_button:'*',

 target_languages: ['heb'],
 target_age: [18,70]
 },

 getLoacation:GetLocation,
 getUrl:GetUrl
},

RedBull:
{
name:'Redbull_13s',
audios: [base_url+name+'.mp3'],
budjet: 1000,
Pay_Per_Second: 0.005,
Pay_Per_Full_Listen: 0.05,

optional_params:{
Pay_Per_Extra_Details: 0.1,
extra_details_active_button:'*',

target_languages: ['heb'],
target_age: [18,35]
},

getLoacation:GetLocation,
getUrl:GetUrl
},

Truma:
{
name:'hibuk rishon truma_23s',
audios: [base_url+name+'.mp3'],
budjet: 1000,
Pay_Per_Second: 0.005,
Pay_Per_Full_Listen: 0.03,

optional_params:{
Pay_Per_Deal: 0.25,
deal_active_button:'1',
Pay_Per_Extra_Details: 0.1,
extra_details_active_button:'*',

target_languages: ['heb'],
target_age: [18,50]
},

getLoacation:GetLocation,
getUrl:GetUrl
},

Rambam:
{
name:'rambam yoldot_30s',
audios: [base_url+name+'.mp3'],
budjet: 1000,
Pay_Per_Second: 0.005,
Pay_Per_Full_Listen: 0.3,

optional_params:{
Pay_Per_Extra_Details: 0.1,
extra_details_active_button:'*',

target_languages: ['heb'],
target_age: [18,50]
},

getLoacation:GetLocation,
getUrl:GetUrl
},

BodyShop:
{
name:'Body Shop_10s',
audios: [base_url+name+'.mp3',base_url+name+' eng.mp3'],
budjet: 1000,
Pay_Per_Second: 0.005,
Pay_Per_Full_Listen: 0.3,

optional_params:{
Pay_Per_Extra_Details: 0.1,
extra_details_active_button:'*',

target_languages: ['heb','eng'],
target_age: [18,50]
},

getLoacation:GetLocation,
getUrl:GetUrl
},

AromaTelAviv:
{
    name:'Aroma dizingoff gordon Kafe And Maafe/icecoffe',
    audios: [base_url+'Aroma dizingoff gordon_8s.mp3',base_url+'Aroma dizingoff gordon warm_8s.mp3'],
    budjet: 500,
    Pay_Per_Second: 0.003,
    Pay_Per_Full_Listen: 0.02,

    optional_params:{
    Pay_Per_Deal: '0.5',
    deal_active_button:'5',

    target_languages: ['heb','eng'],
    target_age: [15,0],
    target_erea: ['lat':32.081713,'lon':34.773771,'radius':2500],//dizingoff gordon
    active_temperatures: [-100,26]
  },

    getLoacation:GetLocation,
    getUrl:GetUrl
   },

 AromaBeerSheva:
 {
       name:'Aroma Big Kafe And Maafe/icecoffe',
       audios: [base_url+'Aroma Big Beer-Sheva_8s.mp3',base_url+'Aroma Big Beer-Sheva Worm_8s.mp3'],
       budjet: 500,
       Pay_Per_Second: 0.003,
       Pay_Per_Full_Listen: 0.02,

       optional_params:{
       Pay_Per_Deal: '0.5',
       deal_active_button:'5',

//////////target info
       target_languages: ['heb','eng'],
       target_age: [15,200],
       target_erea: ['lat':32.081713,'lon':34.773771,'radius':2500],//dizingoff gordon
///////// global info
       active_temperatures: [-100,26]
     },

       getLoacation:GetLocation,
       getUrl:GetUrl
      },

      Arab:
      {
            name:'Arab_10s',
            audios: [base_url+name+'.mp3'],
            budjet: 500,
            Pay_Per_Second: 0.003,
            Pay_Per_Full_Listen: 0.02,

            optional_params:{
            target_languages: ['arab']
          },

            getLoacation:GetLocation,
            getUrl:GetUrl
      },

     Rus:
     {
                 name:'Rus_14s',
                 audios: [base_url+name+'.mp3'],
                 budjet: 500,
                 Pay_Per_Second: 0.003,
                 Pay_Per_Full_Listen: 0.02,

                 optional_params:{
                 target_languages: ['rus']
               },

                 getLoacation:GetLocation,
                 getUrl:GetUrl
     },
///////////experimental
   {
    name:'Gumavir',///great!
    audios: ['http://studio21.co.il/Data/UploadedFiles/Video/419-sFile.swf'],
    budjet: 3000,
    Pay_Per_Second: 0.02,
    Pay_Per_Full_Listen: 0.07,

    optional_params:{
    target_languages: ['heb'],
    target_age: [18,200]
  },

    getLoacation:GetLocation,
    getUrl:GetUrl
   },

   {
    name:'teletop',///great -
    audios: ['http://studio21.co.il/Data/UploadedFiles/Video/281-sFile.swf'],
    budjet: 1000,
    Pay_Per_Second: 0.005,
    Pay_Per_Full_Listen: 0.06,

    optional_params:{
    Pay_Per_Extra_Details: 0.2,
    extra_details_active_button='*';


    target_languages: ['heb'],
    target_age: [21,200]
  },

    getLoacation:GetLocation,
    getUrl:GetUrl
   }



];

module.exports = campains;
