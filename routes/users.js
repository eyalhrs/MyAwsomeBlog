module.exports = function(app) {
    var auth = require('../utils/authUtil');
    // route to test if the user is logged in or not
    app.get('/user/list',auth.isAuth, function(req, res) {
        res.send('blabla');
    });

};