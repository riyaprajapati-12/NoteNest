const  mongoose  = require("mongoose");

const noteSchema = mongoose.Schema({
    title : {
        type : String , 
        required:true
    },
    content : {
        type :String , 
        required:true
    },
    tags : {
        type:[String], 
        default:[]
    },
    isPinned : {
        type : Boolean ,
         default:false},
    userId : { 
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    createOne: { 
        type: Date,
         default: Date.now
         },
});

module.exports = mongoose.model("Note",noteSchema)

