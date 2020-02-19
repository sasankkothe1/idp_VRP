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
    var message = null;

    //sort the couriers list according to the date of delivery
    var latest_couriers_list = couriers_list.sort((a,b) => {
        return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime()
    });

    var miniDepotsNearToRoute = findDirectionFunction.findMiniDepotsNearToRoute(source, destination, steps, mini_depots_objs)

    for(var i=0 ; i<latest_couriers_list.length; i++) {
        var object = await findDirectionFunction.ifSourceDeliverableUnderUserTime(source, destination, userTime, latest_couriers_list[i], process.env.GOOGLE_MAPS_API_KEY);
        if(object.canBeDelivered === true) {  //Change this back to if true
            var c_source = {
                lat : latest_couriers_list[i].source.lat,
                lng : latest_couriers_list[i].source.lng
            }
            var c_destination = {
                lat : latest_couriers_list[i].destination.lat,
                lng : latest_couriers_list[i].destination.lng
            }
            waypoints.push(c_source); waypoints.push(c_destination);
            freetime = freetime - object.traveltime;
            break;
        }
        else {
            findDirectionFunction.wait(3000);
            var miniDepotsNearToCourierDestination = findDirectionFunction.findMiniDepotsNearToCourierDestination(miniDepotsNearToRoute,latest_couriers_list[i]); //under 3kms
            if(miniDepotsNearToCourierDestination == null) {
                console.log("this is undefined")
                message = "No couriers are available. You are being routed via mini depots.";
                break;
            } else {
                console.log("nearest mini depots")
                console.log(miniDepotsNearToCourierDestination)
                var courier_source = {
                    lat : latest_couriers_list[i].source.lat,
                    lng : latest_couriers_list[i].source.lng
                }
                var mini_depot = {
                    lat : miniDepotsNearToCourierDestination.latitude,
                    lng : miniDepotsNearToCourierDestination.longitude
                }
                waypoints.push(courier_source); waypoints.push(mini_depot);
            }
            
        }
    }
    while(freetime > 4800000) {
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
