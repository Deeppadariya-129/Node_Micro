import express from 'express'
import { createTodo, deleteTodo, getAllTodo, getTotoById, updateTodoByID } from '../controller/todoController.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'

const todoRouter = express.Router()

todoRouter.get("/get-all-todo", getAllTodo)
todoRouter.post('/create-todo' , isAuthenticated ,createTodo)
todoRouter.get('/get-by-id/:id' ,isAuthenticated , getTotoById)
todoRouter.delete('/delete-task/:id' ,isAuthenticated , deleteTodo)
todoRouter.put('/update-task/:id' , isAuthenticated , updateTodoByID)

export default todoRouter