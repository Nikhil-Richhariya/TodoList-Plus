import { TodoList } from "@/model/todoList.model";
import dbConnect from "@/lib/dbConnect";

export async function GET (request) {
    await dbConnect(); 
    
    const {list} = await request.json();
    
    TodoList.findOne({
        
    })

}