module.exports = function(app,passport) {
    var blogDal = require('../dal/blogs');
    var auth = require('../utils/authUtil');

    app.post('/blog/add',auth.isAuth,function(req, res) {
        blogDal.create(req.body.title,req.body.text,req.user.id,function (result) {
            var status;
            if (result) {
                status = 200;
            } else {
                status = 500;
            }
            res.sendStatus(status);
        });
   });
    app.get('/blog/get',auth.isAuth,function(req, res) {
        blogDal.getByUserId(req.user.id,function (result) {
            if (result && Array.isArray(result)) {
                res.status(200);
                res.send(JSON.stringify(result));
            } else {
                res.sendStatus(500);
            }
        });
    });

};
