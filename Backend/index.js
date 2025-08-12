
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




