import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 

import userRouter from "../routes/users/user"; 
import accountRouter from "../routes/accounts/account";

dotenv.config();

const app = express();
const port = 3000;

// Global middlewares 
app.use(cors());
app.use(express.json());

// Routes 
app.use("/user", userRouter); 
app.use("/account", accountRouter); 

app.get('/', (req, res) => { 
    res.send("Hello World!!!")
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}) 

