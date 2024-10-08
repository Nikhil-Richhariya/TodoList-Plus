import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user.model";
import { NextResponse } from "next/server";

await dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, verifyCode } = reqBody;
    console.log(reqBody); 

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid User, Please Sign-up first" },
        { status: 400 }
      );
    }
    console.log("user found : ", user); 

    if(user.isVerified) {
      return NextResponse.json(
        { message: "User Already Verified", success: true },
        { status: 200 }
      );
    }

    const verifyCodeExpiry = user.verifyCodeExpiry; 
    if(verifyCodeExpiry < Date.now()) {
      console.log("verification code expired"); 
      return NextResponse.json({message : "Verification code expired, Please sign up again", success : false},{status : 400})
    }



    if (verifyCode == user.verifyCode) {
      user.isVerified = true;
      // user.verifyCode = undefined;
      // user.verifyCodeExpiry = undefined;

      await user.save();

      return NextResponse.json(
        { message: "Email Verified Succesfully", success: true },
        { status: 200 }
      );
    }
    else {
      return NextResponse.json(
        { message: "Please enter correct verfication code !", success: false },
        { status: 400 }
      );
    }



  } catch (error) {
    return NextResponse.json(
      { error: "Error verifying user" + error.message, success: false },
      { status: 500 }
    );
  }
}
