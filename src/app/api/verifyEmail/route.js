import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user.model";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, verifyCode } = reqBody;

    const user = await User.findOne({ username });

    if (!user) {
      return Response.json(
        { error: "Invalid User, Please Sign-up first" },
        { status: 400 }
      );
    }

    if(user.isVerified) {
      return Response.json(
        { message: "User Already Verified", success: false },
        { status: 400 }
      );
    }

    const verifyCodeExpiry = user.verifyCodeExpiry; 
    if(verifyCodeExpiry < Date.now()) {
      return Response.json({message : "Verification code expired, Please sign in again", success : false},{status : 400})
    }

    console.log("verified :", user);

    if (verifyCode === user.verifyCode) {
      user.isVerified = true;
      user.verifyCode = undefined;
      user.verifyCodeExpiry = undefined;

      await user.save();

      return Response.json(
        { message: "Email Verified Succesfully", success: true },
        { status: 200 }
      );
    }
    else {
      return Response.json(
        { message: "Please enter correct verfication code !", success: false },
        { status: 400 }
      );
    }



  } catch (error) {
    return Response.json(
      { error: "Error verifying user" + error.message, success: false },
      { status: 500 }
    );
  }
}
