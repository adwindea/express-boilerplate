const permission = (action, subject) => {
    return (req, res, next) => {
        if(req.ability.can(action, subject)) {
            next();
        } else {
            res.status(401).send({ message: 'Anda tidak memiliki akses' });
        }    
    }
};

export default permission;
