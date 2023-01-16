const express = require("express")
const { DeviceModel } = require("../model/deviceModel")
const deviceRouter = express.Router()

deviceRouter.get("/",async(req,res)=>{
    const device = req.query.MOBILE;
    const device1 = req.query.MOBILE;
    const device2 = req.query.PC
    try {
        if(device){
            const mobile = await DeviceModel.find({device:device})
            res.send(mobile)
        }else if(device1 && device2){
            const data = await DeviceModel.find({$and:[{device:device1},{device:device2}]})
            res.send(data)
        }else{
            const data = await DeviceModel.find()
            res.send(data)
        }
    } catch (error) {
        res.send("Something Went Wrong")
    }
    
})

deviceRouter.post("/create",async (req,res)=>{
    const deviceData = req.body;
    try {
        const devices = new DeviceModel(deviceData)
        await devices.save();
        res.send(devices)
    } catch (error) {
        res.send("Something Went Wrong!!")
    }
})

deviceRouter.patch("/editnUpdate/:id",async(req,res)=>{
    const update = req.body;
    const id =  req.params.id;
    const findData = await DeviceModel.findOne({_id:id})
    const device_userID = findData.userID;
    const users_usersID = req.body.userID;

    try {
        if(users_usersID===device_userID){
            const data = await DeviceModel.findByIdAndUpdate({_id:id},update)
            res.send("Updated")
        }
    } catch (error) {
        res.send("Something Went Wrong")
    }
})

deviceRouter.delete("/delete/:id",async(req,res)=>{
    const id =  req.params.id;
    const findData = await DeviceModel.findOne({_id:id})
    const device_userID = findData.userID;
    const users_usersID = req.body.userID;

    try {
        if(users_usersID===device_userID){
            const data = await DeviceModel.findByIdAndDelete({_id:id})
            res.send("Deleted")
        }
    } catch (error) {
        res.send("Something Went Wrong")
    }
})

module.exports={
    deviceRouter
}