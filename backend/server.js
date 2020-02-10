const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const mini_depot_routes = express.Router();
const PORT = 4000;

let mini_depot = require('./models/mini_depot.model');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/IDP' , {useNewUrlParser : true});
const conneciton  = mongoose.connection;

conneciton.once('open', ()=> {
    console.log("mongodb is connected");
})


app.use("/mini_depots",mini_depot_routes);


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