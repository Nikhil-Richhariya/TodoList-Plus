import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });


export const sendMail =  async  (receiverMail, code) => {

   try {
    const info = await transporter.sendMail({
        from: `"Todo List Plus" <${process.env.MAIL}>`, // sender address
        to: receiverMail, // list of receivers
        subject: "Todo List Plus | Verification Code", // Subject line
        text: "", // plain text body
        html: `<h1>Welcome to TodoList Plus.</h1> <p> This is your verification code : </p> <h1><strong>${code}<strong></h1>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      return (
        {
          success : true, 
          message : "Verification code sent succesfully !"
        }
      )
   } catch (error) {
        console.log("Error sending Email ", error); 
   }
    
  }
  