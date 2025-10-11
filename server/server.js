import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbconection.js';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import todoRouter from './routes/todoRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())

connectDB()

app.use('/api/auth', userRouter)
app.use('/api/todo' , todoRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});