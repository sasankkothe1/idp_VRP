const mongoose = require("mongoose");

// const db_url = 'mongodb://localhost:27017/IDP';

function connectDataBase (db_url) {
    mongoose.connect(db_url , {useNewUrlParser : true, useUnifiedTopology: true });
    const conneciton  = mongoose.connection;
    conneciton.once('open', ()=> {
    console.log("mongodb is connected");
})
}

module.exports = {connectDataBase};
