const { body } = require('express-validator');
const userControl = require("../controller/userControl");
const authentication = require("../middleware/authentication");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Helloooo");
})

//post request for new user with validation 
router.post("/signup", [
    body('name', "Please enter name.").exists(),
    body('email', "Please enter email.").exists(),
    body('email', "Please enter valid email.").isEmail(),
    body('password', "Please enter password.").exists(),
    body('password', "Please enter strong password").isStrongPassword(),
    body('email', "Please enter valid email.").custom(value => {
        return userControl.findUserByEmail(value).then(user => {
            if (user.length!=0) {
                // console.log(user);
                return Promise.reject('E-mail already in use');
            }
        });
    }),
], userControl.createUser);

router.post("/login",[
    body('email', "Please enter email.").exists(),
    body('email', "Please enter valid email.").isEmail(),
    body('password', "Please enter password.").exists(),
],userControl.login)

router.post("/getuser",authentication.authenticateUser,userControl.getUser)
module.exports = router;