const express=require("express")
const cors = require("cors")
const mongoose=require("mongoose")
require("dotenv").config()

const app = express()
const port = 5000

const uri = process.env.uri

app.use(cors())
app.use(express.json())

mongoose.connect(uri, {useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology:true})

const connection=mongoose.connection

connection.once("open",()=>{
    console.log("zalogowany do bazy")
})

const userRoute=require("./user.routes")
app.use("/", userRoute)

app.listen(port, (err)=>{
    if (err) throw err})
