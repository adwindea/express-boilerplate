import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import User from "../models/users.js";
import keys from "../config/jwt.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

const p = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, {
                        fullname : user.fullname,
                        email : user.email,
                        username : user.username,
                        active : user.active,
                        phone : user.phone,
                        aiotku_id : user.aiotku_id,
                        // roles : user.roles,
                        permissions : jwt_payload.permissions
                    });
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
        })
    );
};

export default p
