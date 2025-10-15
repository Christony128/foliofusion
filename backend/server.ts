import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.ts'
import fieldRoutes from './routes/fieldRoutes.ts'
dotenv.config();
const app=express();
const PORT=process.env.port || 1100
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/users',userRoutes)
app.use('/api/fields',fieldRoutes)
app.listen((PORT),()=>{
    console.log(`Listening on port ${PORT}`);
})