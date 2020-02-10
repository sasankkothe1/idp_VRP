

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const findDirectionFunction = require('./functions/findDirection.function.js');
require("dotenv").config();

const PORT = 4000;

let mini_depot = require('./models/mini_depot.model');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const mini_depot_routes = express.Router();
const get_direction_routes = express.Router();

mongoose.connect('mongodb://localhost:27017/IDP' , {useNewUrlParser : true});
const conneciton  = mongoose.connection;

conneciton.once('open', ()=> {
    console.log("mongodb is connected");
})


app.use("/mini_depots",mini_depot_routes);
app.use("/getDirections",get_direction_routes);


get_direction_routes.route('/').post((req, res) => {
    console.log(req.body);
    findDirectionFunction(req.body, process.env.GOOGLE_MAPS_API_KEY);
    res.status(200);
    res.json("got the directions");
})


mini_depot_routes.route('/mini_depot_list').get((req, res)=> {
    mini_depot.find((err, mini_depots)=> {
        if(err){
            console.log(err);
        } else {
            console.log(mini_depots)
            res.json(mini_depots);
        }
    });
});

mini_depot_routes.route('/:id').get((req, res)=> {
   // console.log("this is by ID method")
    let id = req.params.id;
    mini_depot.findById(id, (err, mini_depot)=> {
        console.log(mini_depot)
        if(err){
            console.log(err);
        } else {
            res.json(mini_depot);
        }
    });
});



app.listen(PORT , () => {
    console.log("server is running on the port : " + PORT);
})