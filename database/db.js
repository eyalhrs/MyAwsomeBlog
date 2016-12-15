'use strict';

var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://postgres:sx6667@localhost:5432/MyBlog');

module.exports = db;


