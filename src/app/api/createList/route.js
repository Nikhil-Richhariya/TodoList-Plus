import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user.model";
import { TodoList } from "@/model/todoList.model";
import { NextResponse } from "next/server";

await dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, title } = reqBody;

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "User does not Exists", success : false },
        { status: 400 }
      );
    }

    const newList = new TodoList({
      title,
      isComplete: false,
      createdBy: user._id,
      tasks: [],
    });

    await newList.save();

    return NextResponse.json(
      { success: true, message: "List Created Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error in making list : " + error.message, success: false },
      { status: 500 }
    );
  }
}
