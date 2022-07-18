const {validationResult } = require('express-validator');
const userModel=require("../models/userModel");
const bcryptjs=require('bcryptjs');
const jwt=require("jsonwebtoken");
SECRET="swaminarayanNilkanthHariGhanshyam";

//To enter new user data in database
exports.createUser = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newErr=errors.array();
        // console.log(newErr);
        // console.log(newErr[0].msg)
        return res.status(400).json({ errors: newErr[0].msg});
    }
    
    try{

        hashPassword=await bcryptjs.hash(req.body.password,10)

        //new user created
        userModel.User.create({
            name: req.body.name,
            email:req.body.email,
            password:hashPassword,
        }).then((user) => {
            const data={
                id:user._id
            }
            const result=jwt.sign(data,SECRET);
            console.log(result);
            res.json(user)
        })
    }
    //for database error
    catch(err)
    {
        console.log(err);
        res.status(500).send("Some error occure.");
    }
}

exports.findUserByEmail = (mail) => {
    return userModel.User.find({email:mail});
}


exports.login = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newErr=errors.array();
        // console.log(newErr);
        // console.log(newErr[0].msg)
        return res.status(400).json({ errors: newErr[0].msg});
    }
    
    loginData=req.body;
    const result=await userModel.User.find({email:loginData.email});
    if(result.length==0)
    {
        res.status(400).send("Invalid login details.");
    }
    else
    {
        const checkPassword=await bcryptjs.compare(loginData.password,result[0].password);
        if(checkPassword == false)
            res.status(400).send("Invalid login details.");
        else
        {
            const load={
                id:result[0]._id
            }
            const token=jwt.sign(load,SECRET)
            res.json({
                "token":token
            })
        }
    }
}

exports.getUser = async(req,res) => {
    try{
        userID=req.userID;
        const result = await userModel.User.find({_id:userID});
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occure.");
    }
}