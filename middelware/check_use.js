const checkUser = (req, res, next) => {
    const userPresent = req.cookies.userInfo;
    if (userPresent) {
       next()
    } else {
        res.render("login_page")
   }
}

module.exports = checkUser;