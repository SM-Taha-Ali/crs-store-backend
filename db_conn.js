const dotenv = require("dotenv")
const mongoose = require('mongoose');

dotenv.config({path:"./config.env"})

// const mongoUri = "mongodb://localhost:27017/crs-store";
const mongoUri = process.env.DATABASE;

const connection = () => {
    mongoose.connect(mongoUri).then(()=>{
        console.log("Connection Successful")
    }).catch( (err) => {
        console.log(err)
    })


}

module.exports = connection;