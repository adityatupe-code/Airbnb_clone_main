const express = require("express");

const cleareCookie = express.Router();

cleareCookie.get("/", (req, res) => {
    res.clearCookie("userInfo");
    res.redirect("/")
});

module.exports = cleareCookie;