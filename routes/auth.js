const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");


authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile',"email"],session:false }));

authRouter.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/',session:false }),
    async(req, res) => {
      const userInfo = (req.user)
      console.log("user info ***", userInfo, "---##$$")
      res.cookie("userInfo", userInfo)
      console.log(userInfo)
     
      
    // Successful authentication, redirect home.
      res.redirect("/");
    //res.redirect('/');
  });
    
  
  
  
  
module.exports = authRouter;