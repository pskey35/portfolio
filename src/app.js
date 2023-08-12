const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send(`esta es tu ip: ${req.ip}`)
})

module.exports = app