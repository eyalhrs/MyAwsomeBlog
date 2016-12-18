module.exports = function(app) {
    var userDal = require('../dal/user');
    app.post('/register', function(req, res) {
        userDal.create(req.body.name,req.body.password,function (result) {
            if (result) {
                req.login(result, function(err) {
                    if (err) {
                        return res.sendStatus(500);
                    }
                    return res.sendStatus(200);
                });
            } else {
                return res.sendStatus(500);
            }
        });
    });
};
