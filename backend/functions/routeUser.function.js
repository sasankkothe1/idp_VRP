const googleClient = require('@googlemaps/google-maps-services-js').Client;
const client = new googleClient({});
const geolib = require('geolib');
const findDirectionFunction = require('./findDirection.function');

const routeUser =  async (travelMode, freetime, source, destination, steps, mini_depots_objs, googleMapsKey) => {
    var mini_depots_objs_order = geolib.orderByDistance(source, mini_depots_objs);
    var final_mini_depots = []
    var i = 0;
    var s = source;
    var waypoints = [];
    while(freetime > 300000) {
        var curr_depot = {
            lat :mini_depots_objs_order[i].latitude,
            lng: mini_depots_objs_order[i].longitude
        }
        var distanceTimeObj = await findDirectionFunction.findTimeAndDistanceBetweenPoints(s, curr_depot, travelMode, googleMapsKey);
        freetime = freetime - distanceTimeObj.traveltime;
        s = curr_depot;
        waypoints.push(curr_depot);
        final_mini_depots.push(mini_depots_objs[i])
        i++;
    }


    var finalroute = {
        source : source,
        destination : destination,
        travelMode : 'DRIVING',
        waypoints : waypoints
    }
    return finalroute;
    
}

module.exports = {routeUser}

    // console.log(directions.data.routes[0].legs[0])
    // console.log(freetime);
    // console.log(source);
    // console.log(destination);
    // console.log(steps);
    // console.log(mini_depots_objs);
    // console.log(googleMapsKey);

//    console.log(geolib.isPointWithinRadius(
//         {latitude : source.latitude, longitude : source.longitude},
//         {latitude : destination.latitude, longitude : destination.longitude },
//         5000
//     ))

