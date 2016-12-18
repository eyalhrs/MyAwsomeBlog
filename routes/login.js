module.exports = function(app,passport) {
    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user.name : false);
    });
    app.post('/login',  function(req, res, next) {
        passport.authenticate('local-login', function (user, info) {
            if (!user) {
                return res.sendStatus(401);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.sendStatus(200);
            });
        })(req, res, next);
    });

    app.post('/logout', function(req, res){
        req.logOut();
        res.sendStatus(200);
    });

};
