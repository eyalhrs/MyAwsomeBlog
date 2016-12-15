module.exports = function(app,passport) {
   // route to test if the user is logged in or not
    app.get('/loggedin', function(req, res) {
      res.send(req.isAuthenticated() ? true : false);
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

                console.log('login succeeded!');
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
