
const dbConnect = require("./utils/mongodb.utils");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const findDirectionFunction = require('./functions/findDirection.function.js');
const routeUserfunction = require('./functions/routeUser.function.js');
require("dotenv").config();

const PORT = 4000;

dbConnect.connectDataBase ('mongodb://localhost:27017/IDP');

let mini_depot = require('./models/mini_depot.model');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mini_depot_routes = express.Router();
const get_direction_routes = express.Router();

app.use("/mini_depots",mini_depot_routes);
app.use("/getDirections",get_direction_routes);


get_direction_routes.route('/').post( async (req, res) => { 
    var travelMode = req.body.travelmode;
    var directions = await findDirectionFunction.findDirection(req.body, process.env.GOOGLE_MAPS_API_KEY);
    var userTime = (new Date((req.body.time))).getTime();
    var travelTime = directions.data.routes[0].legs[0].duration.value * 1000;
    var timeNow = (new Date()).getTime();
    var freeTime = userTime - (timeNow + travelTime);
    // if(freeTime > 900000) {   //if free time is more than 15 mins then detour....
    //     console.log("detour possible");
    // }
    // else {
    //     console.log("detour is not possible");
    // }
    let steps = [];
    let directionSteps = directions.data.routes[0].legs[0].steps;
    for(var i = 0; i < directionSteps.length ; i++) {
        var stepobj = {
            latitude : directionSteps[i].end_location.lat , 
            longitude : directionSteps[i].end_location.lng
        }
        steps.push(stepobj);
    }

    var mini_depots_list = await mini_depot.find((err, mini_depots)=> {
        if(err){
            console.log(err);
            } else {
                return mini_depots
            }
        });
    
    var mini_depots_objs = [];

    for(var i = 0; i < mini_depots_list.length; i++) {
        var md_obj = {
            _id : mini_depots_list[i]._id,
            latitude : mini_depots_list[i].geometry.coordinates[1],
            longitude : mini_depots_list[i].geometry.coordinates[0]
        }
        mini_depots_objs.push(md_obj);
    }
    var source = {
        lat : directions.data.routes[0].legs[0].start_location.lat,
        lng : directions.data.routes[0].legs[0].start_location.lng
    }
    var destination = {
        lat : directions.data.routes[0].legs[0].end_location.lat,
        lng : directions.data.routes[0].legs[0].end_location.lng
    }

    var finalRouteToUser = await routeUserfunction.routeUser(travelMode, freeTime, source, destination, steps, mini_depots_objs, process.env.GOOGLE_MAPS_API_KEY);
    if(finalRouteToUser !== null) {
        res.status(200).send(finalRouteToUser)
    } else res.status(400)
})

app.listen(PORT , () => {
    console.log("server is running on the port : " + PORT);
})