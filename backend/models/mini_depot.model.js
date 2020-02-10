const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let mini_depot = new Schema({
    "_id": {
      "type": "String"
    },
    "type": {
      "type": "String"
    },
    "properties": {},
    "geometry": {
      "type": {
        "type": "String"
      },
      "coordinates": {
        "type": [
          "Number"
        ]
      }
    }
  })
 

module.exports = mongoose.model("mini_depot", mini_depot);