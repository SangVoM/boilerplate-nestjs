"use strict";
exports.__esModule = true;
var checkPassword = function (password) {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#^$!%*?&_-])[A-Za-z\d@#^$!%*?&_-]{8,}$/g;
    return pattern.test(password);
};
exports["default"] = checkPassword;
