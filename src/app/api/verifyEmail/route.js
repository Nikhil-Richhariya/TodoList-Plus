import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user.model";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json({ error: "Invalid Token details" }, { status: 400 });
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return Response.json(
      { message: "Email Verified Succesfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
