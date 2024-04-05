const mongoose = require("mongoose")
require('dotenv').config()

const Database_connection = mongoose.connect(process.env.mongodb)

module.exports = {
    Database_connection
}