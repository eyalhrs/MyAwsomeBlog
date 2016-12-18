'use strict';
var db = require('../database/db');
var bcrypt = require('bcrypt');

module.exports = {
    create: function(title,text,userId, callback) {
        db.one("insert into blogs(title,text,userid) values($1, $2, $3) returning id", [title, text, userId])
            .then(function (data) {
                var result;
                if (data.id) {
                    result  = {
                        id: data.id
                    };
                } else {
                    console.log("An error occurred while creating a blog of user " + userId + " result: " + data);
                    result = false;
                }
                callback(result);
            })
            .catch(function (error) {
                console.log("An error occurred while creating a blog of user " + userId + " error: " + error);
                callback(false);
            });
    },
    getByUserId: function(userId,callback) {
        db.many('select * from blogs where userId = $1', userId)
            .then(function (data) {
                var result;
                if (data && Array.isArray(data)) {
                    result = data;
                } else {
                    console.log("An error occurred while getting user by id " + userId + " result: " + data);
                    result = false;
                }
                callback(result);
            })
            .catch(function (error) {
                if (error.code === 0) {
                    callback([]);
                } else {
                    console.log("An error occurred while getting user by id " + userId + " error: " + error);
                }
                callback(false);
            });
    }
};
