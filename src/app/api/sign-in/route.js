import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user.model";
import { NextResponse } from "next/server";

await dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // validation
    // console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user){
      return NextResponse.json(
        { success: false, message: "User does not exists" },
        { status: 400 }
      );
    }

    console.log("user exists");

    if(!user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please Verify your email" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Check your credentials",
        },
        {
          status: 400,
        }
      );
    }


    // generating token
    const tokenPayLoad = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenPayLoad, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in succesfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      {
        success : false,
        message: "Error in sign-in" + error.message,
      },
      {
        status: 500,
      }
    );
  }
}
