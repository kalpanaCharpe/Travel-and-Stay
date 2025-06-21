const User = require("../models/user.js");

module.exports.renderSignupForm =  (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res, next) => {

    try {
        let {username,email,password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser, (err) => {
           if(err){
            return next(err);
           }
           req.flash("success", "User registered successfully!");
           res.redirect("/listings"); 
        })
        // console.log(registeredUser);
        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};


module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req,res) => {
    req.flash("success", "Welcome to Wanderlust, You're logged in!");
    // res.redirect("/listings");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res, next) => {
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "You're logged out!");
        res.redirect("/listings");
    })
};