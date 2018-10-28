const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const db = require("./../models")

module.exports = passport => {
    passport.use(
        "local-login",
        new LocalStrategy(
            {
                usernameField: "manageId",
                passwordField: "managePassword"
            },
            (email, pass, done) =>
                db.User.findOne({
                    where: {
                        userId: email,
                        authority: 0
                    }
                }).then(user => {
                    if (!user) {
                        return done(null, false)
                    }
                    bcrypt.compare(pass, user.password, (err, isVaild) => {
                        if (err) {
                            return done(null, false)
                        } else if (!isVaild) {
                            return done(null, false)
                        } else {
                            return done(null, user)
                        }
                    })
                })
        )
    )

    return passport
}
