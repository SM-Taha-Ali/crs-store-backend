const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/crs-store";

const connection = () => {
    mongoose.connect(mongoUri, ()=>{
        console.log("Connection Successful.")
    })
}

module.exports = connection;