const express = require("express");

const successRouter = express.Router();



successRouter.get('/', (req, res) => {
    const itemId = req.query.id; 
    console.log("success Router",itemId)
    const userPresent = req.cookies.userInfo;
    if (userPresent) {
        res.render("success")
    } else {
        res.render("login_page");
    }
  
});

module.exports = successRouter;