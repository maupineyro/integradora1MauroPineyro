import nodemailer from "nodemailer";
import config from "../config/config.js";

//transporter y su verify
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

//función para enviar mails

export const sendEmail = (req, res) => {
    try {
        const emailForRecovery = req.body;
        if (!emailForRecovery) {
            return res.status(400).send({ message: 'Falta la dirección de correo para reestablecer contraseña' });
        }
        const mailOptions = 
          {
          from: 'coder app ecommerce' + config.gmailAccount,
          to: emailForRecovery,
          subject: 'correo de prueba',
          html: "<div><h1>próximamente cambio de pass</h1></div>",
          attachments: []
          }

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

