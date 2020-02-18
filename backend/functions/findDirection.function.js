//import MapConfig from '../../src/mapconfig';

const googleClient = require('@googlemaps/google-maps-services-js').Client;
const client = new googleClient({});
const geolib = require('geolib');

const wait = (ms) => {
  var d = new Date();
  var d2 = null;
  do { 
    d2 = new Date();
   }while (d2 - d < ms);
   console.log("waiting for "+ms+" ms is done");
}

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
      waypoints: [{ lat: courier.source.lat, lng: courier.source.lng }, { lat: courier.destination.lat, lng: courier.destination.lng }],
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
        courier: courier,
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

const ifSourceDeliverableUnderUserTime = async (userSource, userDestination, userTime, courier, googleMapsKey) => {
  const result = await client.directions({
    params: {
      origin: { lat: userSource.lat, lng: userSource.lng },
      destination: { lat: userDestination.lat, lng: userDestination.lng },
      waypoints: [{ lat: courier.source.lat, lng: courier.source.lng }, { lat: courier.destination.lat, lng: courier.destination.lng }],
      departure_time: new Date().getTime(), //this is the present time when user enters the options
      mode: 'TRANSIT',
      key: googleMapsKey
    },
    timeout: 1000 // milliseconds
  })
    .then(result => {
      var traveltime = result.data.routes[0].legs[0].duration.value * 1000;
      var distance = result.data.routes[0].legs[0].distance.value;
      if ((traveltime + (new Date()).getTime()) < (userTime-600000)) {
        return {
          courier: courier,
          distance: distance,
          traveltime: traveltime,
          canBeDelivered: true
        }

      } else {
        return {
          courier: courier,
          distance: distance,
          traveltime: traveltime,
          canBeDelivered: false
        }
      }
    })
    .catch(e => {
      console.log(e);
    });
  // if((result.traveltime + (new Date()).getTime()) < userTime - 600000) {

  // }
  return result;
}

const findMiniDepotsNearToRoute = (userSource, userDestination, steps, mini_depots_objs) => {
  var nearMiniDepotsAlongRoute = []
  steps.unshift({ latitude: userSource.lat, longitude: userSource.lng }); //adding userSource coordinates at the beginning of steps
  steps.push({ latitude: userDestination.lat, longitude: userDestination.lng }); //adding userDestination coordinates at the ending of steps

  for (var i = 0; i < steps.length; i++) {
    for (var j = 0; j < mini_depots_objs.length; j++) {
      var curr_mini_depot = {
        latitude: mini_depots_objs[j].latitude,
        longitude: mini_depots_objs[j].longitude
      }
      if (geolib.isPointWithinRadius(curr_mini_depot, steps[i], 2000)) nearMiniDepotsAlongRoute.push(JSON.stringify(curr_mini_depot))
    }
  }
  var finalNearMiniDepotsAlongRoute = [...new Set(nearMiniDepotsAlongRoute)];
  var nearMiniDepots = [];
  for (var i = 0; i < finalNearMiniDepotsAlongRoute.length; i++) {
    nearMiniDepots.push(JSON.parse(finalNearMiniDepotsAlongRoute[i]))
  }
  return nearMiniDepots
}

const findMiniDepotsNearToCourierDestination = (miniDepotsNearToRoute, latest_couriers) => {
  var nearestMiniDepotToSourceDestination = null;
  var currLatestCourierDestination = {
    latitude : latest_couriers.destination.lat,
    longitude: latest_couriers.destination.lng
  }
  var miniDepotsNearToCourier = geolib.orderByDistance(currLatestCourierDestination, miniDepotsNearToRoute);
  for(var i = 0; i<miniDepotsNearToCourier.length; i++) {
    if(geolib.isPointWithinRadius(currLatestCourierDestination, miniDepotsNearToCourier[i], 3000) ){
      nearestMiniDepotToSourceDestination = miniDepotsNearToCourier[i];
      break;
    }
  }
}


module.exports = { findDirection, 
                  findTimeAndDistanceBetweenPoints, 
                  findDeliverableCourier, 
                  ifSourceDeliverableUnderUserTime, 
                  findMiniDepotsNearToRoute, 
                  findMiniDepotsNearToCourierDestination, 
                  wait }