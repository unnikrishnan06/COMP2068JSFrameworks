const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new GitHubStrategy({

    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/users/github/callback"

},

async function(accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({
            username: profile.username
        });
        if (!user) {
            user = await User.register(
                new User({
                    username: profile.username
                }),
                Math.random().toString()
            );
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, null);
    }
}));
module.exports = passport;