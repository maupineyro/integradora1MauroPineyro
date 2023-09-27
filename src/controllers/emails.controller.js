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

}

export const sendEmail = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}