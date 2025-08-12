
require("dotenv").config();

const mongoose = require("mongoose")
const userRouter = require ("./Routes/userRouter")
const noteRouter = require ("./Routes/noteRouter")
const express = require ("express");
const cors = require("cors") 
const app = express();
app.use(express.json());

app.use(cors({
    origin:"*",
}));
app.use('/user',userRouter);
app.use('/note',noteRouter);


const connectionString = process.env.MONGODB_URI 

app.get("/",(req,res)=>{
    res.send({data:"i am data"})
});

mongoose.connect(connectionString)
.then(()=>{
    app.listen(8080,()=>{
        console.log("server is running at port no. 8080")
    });
})
.catch((err)=>{
    console.log(err);
})



import path from 'path';
import { fileURLToPath } from 'url';

// For ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/note-app/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/note-app/dist', 'index.html'));
  });
}
