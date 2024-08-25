import dbConnect from "@/lib/dbConnect";
import { TodoList } from "@/model/todoList.model";
import { NextResponse } from "next/server";

await dbConnect();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const index = parseInt(url.searchParams.get("index"));

    const list = await TodoList.findOne({ _id: id });
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

    const content = list.tasks[index].content ; 

    return NextResponse.json(
      { success: true, content },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error getting task content : " + error },
      { status: 500 }
    );
  }
}
