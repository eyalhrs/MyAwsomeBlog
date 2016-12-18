module.exports = function(app,passport) {
    app.get('/loggedin', function(req, res) {
      res.send(req.isAuthenticated() ? req.user.name : false);
   });
    // route to log in
    app.post('/login',  function(req, res, next) {
        passport.authenticate('local-login', function (user, info) {
            if (!user) {
                return res.send(401);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.send(200);
            });
        })(req, res, next);
    });

    // route to log out
    app.post('/logout', function(req, res){
        req.logOut();
        res.send(200);
    });

};
