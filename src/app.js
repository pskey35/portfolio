const express = require("express");
const app = express();
const path = require("path")
//const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodeMailer = require("nodemailer")
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cors())
/*aqui use el cors para que se pueda recibir cookies
en el fetch agregar esto credentials: "include",
y en el servidor poner esto de aqui abajo si no.no funciona
*/
//el cors no funciona en vercel
/*
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true   
  }));
*/
/* 
app.get("/",(req,res)=>{
    const ip =req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(`esta es tu ip: ${ip}`)
})
*/


app.use(express.static(path.join(__dirname, "/../public")));


app.post("/data", (req, res) => {
  console.log(req.body)
  console.log(req.cookies)
  const transport = nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"jayme35371@gmail.com",
        pass:"lrcrfmyshztgpgus"
    }
  })
  const mensaje = {
    from:"jayme35371gmail.com",
    to:"anonimo35371@gmail.com",
    subject:"portafolio contacto",
    text:`input1:${req.body.input1},,,, input2:${req.body.input2}`
  }

  transport.sendMail(mensaje,(err,info)=>{
    console.log(info)
    console.log(err)
    res.json({error:err,info:info,cookieRecibo:req.cookies})
  })
  //res.json({estado:"creado cookie correctamente"})

  //se tiene que enviar algo al cliente para que pueda 
  //crear correctamente la cookie puede ser un res.send() o res.json()
});


module.exports = app;
