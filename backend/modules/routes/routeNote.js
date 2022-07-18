const authentication = require("../middleware/authentication");
const noteControl = require("../controller/noteControl");
const { body } = require('express-validator');
const express=require("express");
const router = express.Router();
const cors = require("cors");

router.get("/",(req,res) => {
    res.send("Hello from note.");
})

//read all notes of loged in user
router.get("/readnote",authentication.authenticateUser,noteControl.readNotes)

//create note for loged in user
router.post("/createnote",authentication.authenticateUser,[
    body('title',"Title is very sort, please enter title perfectly.").isLength({min:5}),
    body('description',"Description is very sort, please enter discription perfectly.").isLength({nin:8}),
    body('tag',"Please enter tag")
],noteControl.createNotes);

//update note for loged in user
router.patch("/updatenote/:id",authentication.authenticateUser,noteControl.updateNotes)

//delete note for loged in user
router.delete("/deletenote/:id",authentication.authenticateUser,noteControl.deleteNote);

module.exports = router;