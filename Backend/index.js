const express = require("express")
const { connection } = require("./config/db")
const { authenticate } = require("./Middleware/authenticate")
const { deviceRouter } = require("./Route/deviceRouter")
const { userRouter } = require("./Route/userRouter")
require("dotenv").config()
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())



app.use("/users",userRouter)
app.use(authenticate)
app.use("/devices",deviceRouter)

app.listen(process.env.Port,async ()=>{
    try {
        await connection
        console.log("Connected To DB")
    } catch (error) {
        console.log(error)
    }
    console.log("COnnected to Server")
})