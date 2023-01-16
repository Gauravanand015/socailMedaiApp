const mongoose = require("mongoose")

const deciveSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    userID: String
})

const DeviceModel = mongoose.model("device",deciveSchema)

module.exports = {
    DeviceModel
}