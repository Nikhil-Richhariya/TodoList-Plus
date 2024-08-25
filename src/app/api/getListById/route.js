import dbConnect from "@/lib/dbConnect";
import { TodoList } from "@/model/todoList.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();

    // get the id of Todolist from url
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const list = await TodoList.findOne({ _id: id });

    if (!list) {
      return NextResponse.json(
        { success: false, message: "List does not exists" },
        { status: 400 }
      );
    }

    if(!list.isPublic) {
      return NextResponse.json(
        { success: false, message: "This is a Private List" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, list }, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { success: false, message: "Error getting the List from DB" },
      { status: 500 }
    );
  }
}
