import dbConnect from "@/lib/dbConnect";
import { TodoList } from "@/model/todoList.model";
import { NextResponse } from "next/server";

await dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { listId, index } = reqBody;

    const list = await TodoList.findOne({ _id: listId });
    if (!list) {
      return NextResponse.json(
        { success: false, message: "List Does not Exists" },
        { status: 400 }
      );
    }

    if (index < 0 || index >= list.tasks.length) {
      return NextResponse.json(
        { success: false, message: "Invalid task index" },
        { status: 400 }
      );
    }

    list.tasks.splice(index, 1);
    await list.save();

    return NextResponse.json(
      { success: true, message: "Task deleted succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting task : " + error },
      { status: 500 }
    );
  }
}
