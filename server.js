const express = require("express");
require('dotenv').config()
const passport = require("passport");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



const ejs = require("ejs");


const authRouter = require("./routes/auth");
const homePage = require("./routes/home_page");
const bookingRouter = require("./routes/booking_Page");
const logout = require("./routes/logout");
const success_Page = require("./routes/success_Page")
const contactHost = require("./routes/contactHost");
const AddHost = require("./routes/AddHost");


const PORT = 3000;


const app = express();
app.use(passport.initialize());
require("./configue/passport");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/auth",authRouter)
app.set("view engine", "ejs");

app.use(express.static("views"));


app.use("/", homePage);
app.use("/bookingPage", bookingRouter);
app.use("/logout", logout);
app.use("/success_Page", success_Page);
app.use("/contactHost", contactHost);
app.use("/AddHost", AddHost);



app.use( (req, res) => {
    res.status(404).render("404");
    
})

app.listen(PORT, () => {
    console.log("Server is started",PORT)
})