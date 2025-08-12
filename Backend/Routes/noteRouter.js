const express = require("express");
const noteRouter = express.Router()
const {createNote,editnote,getNotes,deleteNotes,updatePinnedValue,searchNotes} = require("../Controller/noteController")
const auth = require("../Middleware/auth")

noteRouter.post('/createnote',auth,createNote);
noteRouter.put('/editnote/:id',auth,editnote);
noteRouter.get('/getnote',auth,getNotes);
noteRouter.delete('/deletenote/:id',auth,deleteNotes)
noteRouter.put('/updatepin/:id',auth,updatePinnedValue)
noteRouter.get('/searchnote',auth,searchNotes)
module.exports = noteRouter;

