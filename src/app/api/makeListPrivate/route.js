import dbConnect from "@/lib/dbConnect";
import { TodoList } from "@/model/todoList.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();

    const reqBody = await request.json();
    const { id } = reqBody;

    const list = await TodoList.findOne({ _id: id });

    if (!list) {
      return NextResponse.json(
        { success: false, message: "List does not exists" },
        { status: 400 }
      );
    }
    if (list.isPublic) {
      list.isPublic = false;
      await list.save();
      return NextResponse.json(
        { success: true, message: "List Visibility Changed to Private" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        // no need to save the list here
        { success: true, message: "List already Private" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { success: false, message: "Error Changing Visibility of List " + error.message },
      { status: 500 }
    );
  }
}
