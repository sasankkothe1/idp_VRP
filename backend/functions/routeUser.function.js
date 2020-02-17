const googleClient = require('@googlemaps/google-maps-services-js').Client;
const client = new googleClient({});
const geolib = require('geolib');
const findDirectionFunction = require('./findDirection.function');

const routeUser =  async (couriers_list, travelMode, freetime, source, destination, steps, mini_depots_objs, userTime, googleMapsKey) => {
    var mini_depots_objs_order = geolib.orderByDistance(source, mini_depots_objs);
    var final_mini_depots = []
    var i = 0;
    var s = source;
    var waypoints = [];

    //sort the couriers list according to the date of delivery
    var latest_couriers_list = couriers_list.sort((a,b) => {
        return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime()
    });

    for(var i=0 ; i<latest_couriers_list.length; i++) {
       var curr_deliverable_courier = await findDirectionFunction.findDeliverableCourier(source, destination, latest_couriers_list[i], process.env.GOOGLE_MAPS_API_KEY);
       if ((curr_deliverable_courier.traveltime + new Date().getTime()) < (userTime + 300000)) {
           console.log("true")
           console.log(userTime)
           freetime = freetime - 600000
           waypoints.push({lat : curr_deliverable_courier.courier.source.lat , lng:curr_deliverable_courier.courier.source.lng} , {lat : curr_deliverable_courier.courier.destination.lat , lng:curr_deliverable_courier.courier.destination.lng})
           break;
       } else {
           console.log("false")
       }
    }
    console.log(freetime)
    while(freetime > 1200000) {
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
