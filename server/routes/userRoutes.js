import express from 'express'
import { login, logOut, register } from '../controller/userController.js'

const userRouter = express.Router()


userRouter.post('/register', register)
userRouter.post("/login", login)
userRouter.get('/logout', logOut)

export default userRouter