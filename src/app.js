const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    const ip =req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(`esta es tu ip: ${ip}`)
})

module.exports = app