const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let courier = new Schema({
    "_id": {
      "type": "String"
    },
    "source": {
      "lat": "Number",
      "lng": "Number"
    },
    "destination": {
        "lat": "Number",
        "lng": "Number"
      },
    "deliveryDate": "String"
  })
 

module.exports = mongoose.model("courier", courier);