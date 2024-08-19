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
        subject: "Verification Code - Todo List Plus", // Subject line
        text: "Welcome to TodoList Plus. This is your verification code : ", // plain text body
        html: `<h1>${code}</h1>`, // html body
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
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  