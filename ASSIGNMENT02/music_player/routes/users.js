const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/register", function (req, res) {
    res.render("users/register", {
        title: "Register"
    });
});
router.post("/register", async function (req, res) {
    try {
        const user = new User({
            username: req.body.username
        });
        await User.register(user, req.body.password);
        res.redirect("/users/login");
    }
    catch (error) {
        console.log(error);
        res.redirect("/users/register");
    }
});
router.get("/login", function (req, res) {
    res.render("users/login", {
        title: "Login"
    });
});
router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/songs",
        failureRedirect: "/users/login"
    })
);
router.get("/logout", function (req, res, next) {
    req.logout(function (error) {
        if (error) {
            return next(error);
        }
        res.redirect("/");
    });
});
router.get("/github",
    passport.authenticate("github", {
        scope: ["user:email"]
    })
);

router.get("/github/callback",
    passport.authenticate("github", {
        successRedirect: "/songs",
        failureRedirect: "/users/login"
    })
);
module.exports = router;