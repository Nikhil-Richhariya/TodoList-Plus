import { TodoList } from "@/model/todoList.model";
import { User } from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exists" },
        { status: 400 }
      );
    }

    const lists = await TodoList.find({
      createdBy: user._id,
    });

    return NextResponse.json({ success: true, lists }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
