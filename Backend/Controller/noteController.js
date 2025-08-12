
const noteSchema = require ("../models/noteModel.js");
//Create Note
const createNote = async (req,res) =>{
    
    const {title,content,tags} = req.body;
    const newNote = new noteSchema({
        title : title,
        content : content,
        tags: tags || [],
        userId : req.userId
    });
    try {
        
        await newNote.save();
        res.status(201).json(newNote)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"})
    }

}

//Edit Note

const editnote = async (req,res)=>{
        const id = req.params.id;
        const {title,content,tags,isPinned} = req.body;
        const newNote = {
            title:title,
            content:content,
            tags:tags,
            isPinned:isPinned,
            userId:req.userId,
            
        }
        try {
            await noteSchema.findByIdAndUpdate(id,newNote,{new:true})//new:true humare database me jaa kr change karega
            res.status(200).json(newNote);
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"something went wrong"})
        }
}

//get all notes
const getNotes = async (req,res) =>{
    try {
        const notes = await noteSchema.find({userId : req.userId})
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
}

//Delete notes

const deleteNotes = async (req,res) =>{
    const id = req.params.id;
    try {
        const note = await noteSchema.findByIdAndDelete(id);
        res.status(200).json(note);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
}

//update pinvalue
const updatePinnedValue = async (req,res) =>{
    const {isPinned} = req.body;
    const id = req.params.id;
    const notes = {
        isPinned:isPinned 
    }
    try {
        const note = await noteSchema.findByIdAndUpdate(id,notes,{new:true})
        res.status(200).json(note)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
}
// search notes
const searchNotes = async (req, res) => {
    const userId = req.userId;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "search query is required" });
    }

   

    try {
        const matchingNotes = await noteSchema.find({
            userId,
            $or: [
                { title: { $regex: new RegExp(query, 'i') } },
                { content: { $regex: new RegExp(query, 'i') } },
            ]
        });

        

        return res.json({
            notes: matchingNotes,
            message: "notes matching the search query"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
}

module.exports = {createNote,editnote,getNotes,deleteNotes,updatePinnedValue,searchNotes}