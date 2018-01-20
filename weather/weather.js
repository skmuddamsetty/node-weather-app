const request = require('request');
var getWeather = (lat,long,callback) =>{
  request({
  url: `https://api.darksky.net/forecast/f66d472aca9a8039df622b734790003d/${lat},${long}`,
  json: true
},(error,response,body)=>{
  if(!error && response.statusCode===200){
    callback(undefined,{
      temperature: body.currently.temperature,
      apparentTemperature:body.currently.apparentTemperature
    });
  }else{
    callback('unable to fetch weather');
  }
})
};

module.exports = {
  getWeather
};
