import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user.model";
import bcryptj from "bcryptjs";
import { sendMail } from "@/lib/nodeMailer";

export async function POST(request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await User.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
        }
      );
    }   

    const existingUserByEmail = await User.findOne({
        email
    })

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); 

    if(existingUserByEmail) {
        
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); 


        const newUser = new User({
            username, 
            email, 
            password : hashedPassword,
            verifyCode,
            verifyCodeExpiry : expiryDate,
            isVerified : false , 

        })

        await newUser.save(); 
    }


    // sending verification email
    const emailResponse = await sendMail(email, verifyCode); 

    if( !emailResponse.success )


  } catch (error) {
    console.error("Error registering user ", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
