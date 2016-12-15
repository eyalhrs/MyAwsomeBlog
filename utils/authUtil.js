module.exports = {
    isAuth: function(req, res, next) {
        if (!req.isAuthenticated())
            res.send(401);
        else next();
    }
};
