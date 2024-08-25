import dbConnect from "@/lib/dbConnect";
import { TodoList } from "@/model/todoList.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const { id } = await request.json();
    await TodoList.deleteOne({_id : id}); 
    console.log("deleted")
    return NextResponse.json(
        {
          success: true,
          message: "List deleted Succesfully",
        },
        {
          status: 200,
        }
      );
  } catch (error) {
    console.error("Error in deleting List ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in deleting List",
      },
      {
        status: 500,
      }
    );
  }
}
