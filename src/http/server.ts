import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();

const app = express();
const port = 3000;

// Global middlewares 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { 
    res.send("Hello World!!!")
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}) 

