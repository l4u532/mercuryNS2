var config = require("../../shared/config");
var firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var validator = require("email-validator");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new observableModule.Observable({
        email: info.email || "hans@wurst.com",
        password: info.password || "hanswurst"
    });

    viewModel.init = function(){
        firebase.init(config).then(
              function (instance) {
                console.log("firebase.init done");
              },
              function (error) {
                console.log("firebase.init error: " + error);
              }
          );
    };

    viewModel.login = function() {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            // email: 'hans@wurst.com',
            // password: 'hanswurst'
            email: viewModel.get("email"),
            password: viewModel.get("password")
          }).then(
            function (response) {
                config.uid = response.uid
                return response;
            });
    };

    viewModel.register = function() {
        return firebase.createUser({
            email: viewModel.get("email"),
            password: viewModel.get("password")
          }).then(
              function (response) {
                console.log(response);
                return response;
              }
          )
    };

    return viewModel;
}

module.exports = User;
