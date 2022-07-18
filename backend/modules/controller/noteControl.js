const noteModel = require("../models/noteModel");
const {validationResult } = require('express-validator');

exports.readNotes = async(req,res) => {
    try{
        const result=await noteModel.Note.find({userID:req.userID});
        res.json(result);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Some error occure.");
    }
}

//function for store notes in database
exports.createNotes = async(req,res) => {

    //Validation error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newErr=errors.array();
        // console.log(newErr);
        // console.log(newErr[0].msg)
        return res.status(400).json({ errors: newErr[0].msg});
    }

    try{
        //storing the note in database
        userNote=req.body;
        userNote.userID=req.userID;
        const doc=new noteModel.Note(userNote);
        const result = await doc.save();
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occure.");
    }
}

//update note
exports.updateNotes = async(req,res) =>{
    try{
        const result=await noteModel.Note.findById(req.params.id);
        //if note not found then do not allow user to go further
        if(!result)
            return res.status(404).send("Note not found");
            
        //if user is not logged in then do not permit user to update note
        if(result.userID.toString() !== req.userID)
            return res.status(401).send("Not allowed to update.");

        data=req.body;
        // const updateData =await noteModel.Note.updateOne({_id:req.params.id},data,{new:true});
        const updateData = await noteModel.Note.findByIdAndUpdate(req.params.id,{$set:data},{new:true});
        res.json(updateData);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occure.");
    }
}

//delete note
exports.deleteNote = async(req,res) => {
    try{
        const result = await noteModel.Note.findById(req.params.id);
        //if note not found then do not allow user to go further
        if(!result)
        return res.status(404).send("Note not found.");
        
        //if user is not logged in then do not permit user to delete note
        if(result.userID.toString() !== req.userID)
            return res.status(401).send("Not allowed to delete.");
    
        const deleteData = await noteModel.Note.findByIdAndDelete(req.params.id)
        res.send(deleteData);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occure.");
    }
}