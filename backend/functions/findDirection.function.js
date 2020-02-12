//import MapConfig from '../../src/mapconfig';

const googleClient = require('@googlemaps/google-maps-services-js').Client;
const client = new googleClient({});

const findDirection = async (userOptions, googleMapsKey) => {
    const result = await client.directions({
    params: {
      origin: userOptions.source,
      destination: userOptions.destination,
      departure_time: new Date(userOptions.time),
      mode: userOptions.travelmode,
      key: googleMapsKey
    },
    timeout: 1000 // milliseconds
  })
  .then(r => {    
     return r;
  })
  .catch(e => {
    console.log(e);
  });
  //console.log(result.data.routes[0].legs[0].steps.length)
  //console.log("result" + result)
  return result;
}

module.exports = findDirection