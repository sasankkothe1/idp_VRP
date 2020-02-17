//import MapConfig from '../../src/mapconfig';

const googleClient = require('@googlemaps/google-maps-services-js').Client;
const client = new googleClient({});

const findDirection = async (userOptions, googleMapsKey) => {
  const result = await client.directions({
    params: {
      origin: userOptions.source,
      destination: userOptions.destination,
      departure_time: new Date().getTime(), //this is the present time when user enters the options
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

const findTimeAndDistanceBetweenPoints = async (source, destination, travelmode, googleMapsKey) => {
  const result = await client.directions({
    params: {
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      departure_time: new Date().getTime(), //this is the present time when user enters the options
      mode: travelmode,
      key: googleMapsKey
    },
    timeout: 1000 // milliseconds
  })
    .then(result => {
      var traveltime = result.data.routes[0].legs[0].duration.value * 1000;
      var distance = result.data.routes[0].legs[0].distance.value;
      var obj = {
        distance: distance,
        traveltime: traveltime
      };
      return obj;
    })
    .catch(e => {
      console.log(e);
    });
    return result;
  //console.log(result.data.routes[0].legs[0].steps.length)
  //console.log("result" + result)
}

const findDeliverableCourier = async (source, destination, courier, googleMapsKey) => {
  const result = await client.directions({
    params: {
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      waypoints : [{lat : courier.source.lat , lng:courier.source.lng} , {lat : courier.destination.lat , lng:courier.destination.lng}],
      departure_time: new Date().getTime(), //this is the present time when user enters the options
      mode: 'TRANSIT',
      key: googleMapsKey
    },
    timeout: 1000 // milliseconds
  })
    .then(result => {
      var traveltime = result.data.routes[0].legs[0].duration.value * 1000;
      var distance = result.data.routes[0].legs[0].distance.value;
      var obj = {
        courier : courier,
        distance: distance,
        traveltime: traveltime
      };
      return obj;
    })
    .catch(e => {
      console.log(e);
    });
   // console.log(result)
   return result;
}

module.exports = { findDirection, findTimeAndDistanceBetweenPoints, findDeliverableCourier }