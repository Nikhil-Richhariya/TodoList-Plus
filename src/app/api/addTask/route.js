import dbConnect from "@/lib/dbConnect";
import { TodoList } from "@/model/todoList.model";
import { NextResponse } from "next/server";

await dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { listId, content } = reqBody;

    const list = await TodoList.findOne({ _id: listId });
    if(!list) {
        return NextResponse.json(
            { success: false, message: "List Does not Exists" },
            { status: 400 }
          );
    }

    if(!content) {
      return NextResponse.json(
        { success: false, message: "Task Can't be Empty" },
        { status: 400 }
      );
    }

    const newTask = {
      content, 
      iscomplete : false,
    }

    list.tasks.push(newTask);

    await list.save();

    return NextResponse.json(
      { success: true, message: "Task added succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error Adding Task : " + error },
      { status: 500 }
    );
  }
}
