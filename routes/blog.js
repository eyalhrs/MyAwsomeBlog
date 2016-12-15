module.exports = function(app,passport) {
    var blogDal = require('../dal/blogs');
    var auth = require('../utils/authUtil');

    app.post('/blog/add',auth.isAuth,function(req, res) {
        blogDal.create(req.body.title,req.body.text,req.user.id,function (result) {
            if (result) {
                res.send(200);
            } else {
                res.send(500);
            }
        });
   });
    app.get('/blog/get',auth.isAuth,function(req, res) {
        blogDal.getByUserId(req.user.id,function (result) {
            if (result && Array.isArray(result)) {
                res.send(JSON.stringify(result));
            } else {
                res.send(500);
            }
        });
    });

};
