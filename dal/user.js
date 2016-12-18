'use strict';
var db = require('../database/db');
var bcrypt = require('bcrypt');

module.exports = {
    get: function(name,plainTextPassword, callback) {
        db.one('select * from users where name = $1', name)
            .then(function (data) {
                var valid = bcrypt.compareSync(plainTextPassword,data.password);
                var result;
                if (valid) {
                    result = {id: data.id,name: data.name};
                } else {
                    console.log("An error occurred while getting user " + name + ", password does not match");
                    result = false;
                }
                callback(result);
            })
            .catch(function (error) {
                console.log("An error occurred while getting user " + name + " , " + error);
                callback(false);
            });

    },
    create: function(name,plainTextPassword, callback) {
        var hash = bcrypt.hashSync(plainTextPassword, 10);
        db.one("insert into users(name, password) values($1, $2) returning id", [name, hash])
            .then(function (data) {
                var result;
                if (data.id) {
                    result = {
                        id: data.id,
                        name: name
                    };
                } else {
                    result = false;
                    console.log("An error occurred while creating user " + name + ", result returned " + (data));
                }
                callback(result);
            })
            .catch(function (error) {
                console.log("An error occurred while creating user " + name + ", result returned " + (error));
                callback(false);
            });
    },
    getById: function(id,callback) {
        db.one('select id,name from users where id = $1', id)
            .then(function (data) {
                var result;
                if (data.id) {
                    result = data;
                } else {
                    result = false;
                    console.log("An error occurred while fetching user by id " + id + ", result returned " + (data));
                }
                callback(result);
            })
            .catch(function (error) {
                console.log("An error occurred while fetching user by id " + id + ", result returned " + (error));
                callback(false);
            });
    }
};
