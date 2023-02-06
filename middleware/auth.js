import defineAbility from './abilities.js';

import passport from "passport";

const authMiddleware = (req, res, next) => {
    // Periksa apakah ada token JWT di request header
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error || !user) {
            res.status(401).send({ message: 'Anda tidak memiliki akses' });
        } else {
            req.user = user;
            defineAbility(req);
            next();
        }
    })(req, res, next);
};

export default authMiddleware;
