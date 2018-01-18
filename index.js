const request = require('request');
const yargs = require('yargs');
const argv = yargs
.options({
  a:{
    demand: true,
    alias: 'address',
    describe:'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help','h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
},(error,response,body)=>{
  if(error){
    console.log('Unable to connect to Google Servers');
  }else if(body.status === 'ZERO_RESULTS'){
    console.log('Unable to find the address that was provided');
  }else if(body.status === 'OK'){
    console.log(`Address: ${JSON.stringify(body.results[0].formatted_address)}`);
    console.log(`Latitude: ${JSON.stringify(body.results[0].geometry.location.lat)}`);
    console.log(`Longitude: ${JSON.stringify(body.results[0].geometry.location.lng)}`);
  }
});
