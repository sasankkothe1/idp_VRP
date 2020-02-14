
const dbConnect = require("./utils/mongodb.utils");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const findDirectionFunction = require('./functions/findDirection.function.js');
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


// get_direction_routes.route('/').post( async (req, res) => {
//     var time1 = (new Date((req.body.time))).getTime();
//     console.log((new Date((req.body.time))).getTime());
//    var directions = await findDirectionFunction(req.body, process.env.GOOGLE_MAPS_API_KEY);
//    console.log(directions.data.routes[0].legs);
//    var time2 = (new Date()).getTime();
//    console.log((new Date((req.body.time))).getTime());
//    console.log(time2)
//    console.log(time1>time2)
//     //console.log(directions.data.routes[0].legs[0].steps)
//     res.status(200);
//     //res.json(directions);
// })


get_direction_routes.route('/').post( async (req, res) => { 
    var directions = await findDirectionFunction(req.body, process.env.GOOGLE_MAPS_API_KEY);
    var userTime = (new Date((req.body.time))).getTime();
    //console.log((new Date((req.body.time))).getTime());
    var travelTime = directions.data.routes[0].legs[0].duration.value * 1000;
    //console.log(travelTime)
    var timeNow = (new Date()).getTime();
    //console.log((new Date()).getTime())
    var freeTime = userTime - (timeNow + travelTime);
    if(freeTime > 900000) { 
        console.log("detour possible");
    }
    else {
        console.log("detour is not possible");
    }
    //console.log(directions.data.routes[0].legs[0])
    console.log(directions.data.routes[0].legs[0].steps[0].end_location)
    //console.log("Free Time :: " + freeTime);
    res.send(200);
})

// mini_depot_routes.route('/mini_depot_list').get((req, res)=> {
//     mini_depot.find((err, mini_depots)=> {
//         if(err){
//             console.log(err);
//         } else {
//             console.log(mini_depots)
//             res.json(mini_depots);
//         }
//     });
// });

// mini_depot_routes.route('/:id').get((req, res)=> {
//    // console.log("this is by ID method")
//     let id = req.params.id;
//     mini_depot.findById(id, (err, mini_depot)=> {
//         console.log(mini_depot)
//         if(err){
//             console.log(err);
//         } else {
//             res.json(mini_depot);
//         }
//     });
// });



app.listen(PORT , () => {
    console.log("server is running on the port : " + PORT);
})