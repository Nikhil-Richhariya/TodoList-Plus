import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

await dbConnect();

export async function POST(request) {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    console.log("Logged Out Succesfully "); 
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error in logging out : " + error.message,
      },
      {
        status: 500,
      }
    );
  }
}
