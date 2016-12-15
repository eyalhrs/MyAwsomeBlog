var express = require('express');
var path = require('path');
var passport = require('passport');

var app = express();
app.get('/', function(req, res, next){
    return res.sendfile('public/app/views/index.tpl.html');
});

var passportSetup = require('./utils/passport-setup')();
passportSetup.appSetup(app,passport);
passportSetup.passSetup(app,passport);

require('./routes/login')(app,passport);
require('./routes/users')(app);
require('./routes/register')(app);
require('./routes/blog')(app);

app.use('/public',express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


module.exports = app;
