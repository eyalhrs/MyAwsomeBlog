"use strict";

module.exports = function () {
    var express = require('express'),
        flash = require('connect-flash'),
        LocalStrategy = require('passport-local').Strategy,
        cookieParser = require('cookie-parser'),
        cookieSession = require('cookie-session'),
        userDal = require('../dal/user')


    function passSetup(app, passport) {
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(userId, done) {
            userDal.getById(userId,function(callerUser) {
                if (callerUser !== false) {
                    done(null, callerUser); // in case result is not false, it'll be saved into request.user
                } else {
                    done(null, false);
                }
            });
        });

        /***************LOGIN*************/
        passport.use('local-login', new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: true
        }, function(req, name, password, done) {

            userDal.get(name, password,function (result) {
                if (result) {
                    console.log('Login success');
                    done(result,'Login success');
                } else {
                    console.log('Login failed');
                    done(false, 'Login failed');
                }
            });

        }));
    }



    function appSetup(app ,passport){
        app.disable('x-powered-by');

        app.use(cookieParser());
        var bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({limit : '50mb', extended: true }));
        app.use(bodyParser.json());

        app.use(flash());

        app.use(cookieSession({
            key: 'value',
            secret: 'keyboard cat and then dawg, yo',
            cookie: {
                // domain: getDomain()
                //, maxAge: 1000 * 60 * 24
            }
        }));

        app.use(passport.initialize());
        app.use(passport.session());
    }


    return {
        // getPort : getPort,
        passSetup : passSetup,
        // setupErrorHandling : setupErrorHandling,
        appSetup : appSetup
    }
}
