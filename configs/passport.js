const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('../models/User')
const mongoose = require('mongoose')
const User = mongoose.model('users')

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.SECRET_OR_KEY,
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User
                    .findById(jwt_payload._id)
                    .select('_id firstName role')
                return user ? done(null, user) : done(null, false)
            } catch (error) {
                throw new Error(`something went wrong: ${error}`)
            }
        })
    )
}
