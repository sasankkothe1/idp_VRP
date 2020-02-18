
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
let courier = require('./models/courier.model');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mini_depot_routes = express.Router();
const get_direction_routes = express.Router();
const add_mini_depot_routes = express.Router();
const add_courier_routes = express.Router();

app.use("/mini_depots",mini_depot_routes);
app.use("/getDirections",get_direction_routes);
app.use("/addMiniDepot",add_mini_depot_routes);
app.use("/addCourier",add_courier_routes);



get_direction_routes.route('/').post( async (req, res) => { 
    var travelMode = req.body.travelmode;
    var directions = await findDirectionFunction.findDirection(req.body, process.env.GOOGLE_MAPS_API_KEY);
    var userTime = (new Date((req.body.time))).getTime();
    var travelTime = directions.data.routes[0].legs[0].duration.value * 1000;
    var timeNow = (new Date()).getTime();
    var freeTime = userTime - (timeNow + travelTime);
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

    //getting all the couriers from the backend MongoDB
    var couriers_list = await courier.find((err, couriers) => {
        if(err){
            console.log(err)
        } else {
            return couriers
        }
    })    
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

    var finalRouteToUser = await routeUserfunction.routeUser(couriers_list, travelMode, freeTime, source, destination, steps, mini_depots_objs, userTime, process.env.GOOGLE_MAPS_API_KEY);
    if(finalRouteToUser !== null) {
        res.status(200).send(finalRouteToUser)
    } else res.status(400)
})

add_mini_depot_routes.route("/").post(async (req,res) => {
    console.log("reached backend");
    let new_mini_depot = new mini_depot(req.body);
    new_mini_depot.save()
                  .then(mini_depot => {
                      console.log("saved")
                      res.status(200).send({"Message" : "Mini Depot added successfully"})
                  })
                  .catch(err => {
                      console.log("not saved")
                      res.status(400).send('adding mini depot failed');
                  }) 
});

add_courier_routes.route("/").post(async (req,res) => {
    let new_courier = new courier(req.body);
    new_courier.save()
               .then(courier_added_new => {
                res.status(200).send({"Message" : "Courier added successfully"})
               })
               .catch(err => {
                console.log("not saved")
                res.status(400).send('adding courier failed');
            }) 
})

app.listen(PORT , () => {
    console.log("server is running on the port : " + PORT);
})