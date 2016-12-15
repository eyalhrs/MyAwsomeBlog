'use strict';
var db = require('../database/db');
var bcrypt = require('bcrypt');

module.exports = {
    create: function(title,text,userId, callback) {
        db.one("insert into blogs(title,text,userid) values($1, $2, $3) returning id", [title, text, userId])
            .then(function (data) {
                console.log(data);
                if (data.id) {
                    callback({
                        id: data.id
                    });
                } else {
                    callback(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                callback(false);
            });
    },
    getByUserId: function(userId,callback) {
        db.many('select * from blogs where userId = $1', userId)
            .then(function (data) {
                console.log(data);
                if (data) {
                    callback(data);
                } else {
                    callback(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                callback(false);
            });
    }
};
