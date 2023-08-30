const express = require("express");
const app = express();
const path = require("path")
const nodeMailer = require("nodemailer")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "/../public")));


app.post("/data", (req, res) => {
  const transport = nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.usuario,
        pass:process.env.password
    }
  })
  const mensaje = {
    from:process.env.usuario,
    to:process.env.to,
    subject:"portafolio contacto",
    text:`email:${req.body.correo}  ||   mensaje:${req.body.mensaje}`
  }

  transport.sendMail(mensaje,(err,info)=>{
    res.json({error:err})
  })
});


module.exports = app;
