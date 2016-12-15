'use strict';
var db = require('../database/db');
var bcrypt = require('bcrypt');

module.exports = {
    get: function(name,plainTextPassword, callback) {
        db.one('select * from users where name = $1', name)
            .then(function (data) {
                var valid = bcrypt.compareSync(plainTextPassword,data.password);
                if (valid) {
                    callback({id: data.id,name: data.name});
                } else {
                    callback(false);
                }
            })
            .catch(function (error) {
                callback(false);
            });

    },
    create: function(name,plainTextPassword, callback) {
        var hash = bcrypt.hashSync(plainTextPassword, 10);
        db.one("insert into users(name, password) values($1, $2) returning id", [name, hash])
            .then(function (data) {
                if (data.id) {
                    callback({
                        id: data.id,
                        name: name
                    });
                } else {
                    callback(false);
                }
            })
            .catch(function (error) {
                callback(false);
            });
    },
    getById: function(id,callback) {
        db.one('select id,name from users where id = $1', id)
            .then(function (data) {
                if (data.id) {
                    callback(data);
                } else {
                    callback(false);
                }
            })
            .catch(function (error) {
                callback(false);
            });
    }
};
