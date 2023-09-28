import nodemailer from "nodemailer";
import config from "../config/config.js";



const transporter = nodemailer.createTransport (
  {
    service: 'gmail',
    port: 587,
    auth:{
      user: config.gmailAccount,
      pass: config.gmailAppPassword
    }          
  }
)

transporter.verify(function(error, success){
  if (error){
      console.log(error)
  } else {
      console.log('nodemailer transporter auth ok')
  }
})

const mailOptions = {
  from: 'coder app ecommerce' + config.gmailAccount,
  to: config.gmailAccount,
  subject: 'correo de prueba',
  html: "<div><h1>próximamente cambio de pass</h1></div>",
  attachments: []
}

export const sendEmail = (req, res) => {
    try {
        let result = transporter.sendMail(mailOptions,(error, info)=>{
          if(error){
            console.log(error)
            res.status(400).send({message:"error", payload:error})
          }
        res.send({message:"Success", payload: info})  
        })
    } catch (error) {
      console.log(error);
      res.status(500).send({error: error, message:"no se pudo enviar el email desde"+ config.gmailAccount })  
    }
}