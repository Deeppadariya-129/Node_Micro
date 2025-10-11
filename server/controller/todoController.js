import { Todo } from "../models/todo.js"


export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body

        console.log("---------------------------->>" , title , description);
        

        if (!title || !description) {
            return res.status(403).json({success:false ,  message:"All fields are required"})
        }

        const newTask = new Todo({ title, description })
        newTask.save()
        
        return res.status(200).json({success:true ,  message:"Task created successfully"})

    } catch (error) {
        res.status(500).json({success:false ,  message:"Internal Server Error"})
    }
}



export const getAllTodo = async (req, res) => {
    try {

        const allTodo = await Todo.find({})
        return res.status(200).json({ success: true, message: "Task created successfully",allTodo })
        
    } catch (error) {
        res.status(500).json({success:false ,  message:"Internal Server Error"})
    }
}   

export const getTotoById = async (req , res) => {
    try {
        const { id } = req.params
        
        if (!id) {
            return res.status(400).json({success:false ,  message:"Missing Todo ID"})
        }

        const todoById = await Todo.findById(id);

        if (!todoById) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }
        
        return res.status(200).json({ success: true, message: "Task fetched successfully by ID",todo:todoById })

    } catch (error) {
        res.status(500).json({success:false ,  message:"Internal Server Error"})
    }
}


export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        
        if (!id) {
            res.status(400).json({success:false ,  message:"Missing Todo ID"})
        }

        const deleteById = await Todo.findByIdAndDelete(id)

        if (!deleteById) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        return res.status(200).json({ success: true, message: "Task deleted successfully" , Deleted_Todo:deleteById})

    } catch (error) {
        console.error("Error deleting todo by ID:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const updateTodoByID = async (req, res) => {
    try {
        
        const { id } = req.params
        const { title } = req.body
        
        if (!id ) {
            res.status(400).json({success:false ,  message:"Missing Todo ID"})
        }

        if (!title ) {
            res.status(400).json({success:false ,  message:"Missing Todo details"})
        }

        const updateTodo = await Todo.findByIdAndUpdate(id, { title: title })
        updateTodo.save()

        if(!updateTodo){
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        const updatedTodo = await Todo.findById(id)

        return res.status(200).json({ success: true, message: "Task Updated successfully", Updated_Todo: updatedTodo })
        
    } catch (error) {
        console.error("Error deleting todo by ID:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}