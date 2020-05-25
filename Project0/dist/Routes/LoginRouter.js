"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var index_1 = require("../config/index");
var loginRouter = express_1.Router();
var fs_1 = require("fs");
loginRouter.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, username, password, result_user, role_user, result_password, extracted_user, extracted_role, extract_password, role_convert, user_role, pass, parsed_pass, names, parsed_user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs_1.appendFile('./dist/logs.txt', "\nA request has been made to " + req.url + " with the method of + " + req.method + " " + Date.now().toString(), function (err) {
                    if (err)
                        throw err;
                });
                return [4 /*yield*/, index_1.pool.connect()];
            case 1:
                client = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, 7, 8]);
                username = req.body.username;
                password = req.body.password;
                return [4 /*yield*/, client.query("SELECT user_accounts.username from user_accounts Where username = '" + username + "';")];
            case 3:
                result_user = _a.sent();
                return [4 /*yield*/, client.query("SELECT role_type\n        FROM role INNER JOIN user_accounts ON (role.username = user_accounts.username) Where role.username = '" + username + "';")];
            case 4:
                role_user = _a.sent();
                return [4 /*yield*/, client.query("SELECT user_accounts.password from user_accounts Where password = '" + password + "';")];
            case 5:
                result_password = _a.sent();
                extracted_user = (result_user.rows);
                extracted_role = (role_user.rows);
                extract_password = (result_password.rows);
                role_convert = extracted_role.map(function (item) {
                    return item['role_type'];
                });
                user_role = role_convert.toString();
                pass = extract_password.map(function (item) {
                    return item['password'];
                });
                parsed_pass = pass.toString();
                names = extracted_user.map(function (item) {
                    return item['username'];
                });
                parsed_user = names.toString();
                if (username === "") {
                    res.send("please enter username");
                }
                else if (parsed_user === username) {
                    //add validation password is empty
                    if (password === parsed_pass) {
                        if (req.session) { //usually you would set the data of the user to the session
                            req.session.user = username;
                            req.session.role = user_role;
                            console.log('Successfully logged-in');
                            if (req.session.role === 'Admin') {
                                res.redirect('/getAllaccounts');
                            }
                            else {
                                res.redirect('/studDashboard');
                            }
                        }
                    }
                    else {
                        res.send('You have entered a wrong password');
                    }
                }
                else {
                    res.send('Wrong Password or username');
                }
                return [3 /*break*/, 8];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                res.send("Please check on your query");
                return [3 /*break*/, 8];
            case 7:
                client && client.release();
                res.end();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); });
loginRouter.get('/logout', function (req, res, err) {
    fs_1.appendFile('./dist/logs.txt', "\nA request has been made to " + req.url + " with the method of + " + req.method + " " + Date.now().toString(), function (err) {
        if (err)
            throw err;
    });
    if (req.session && req.session.user !== undefined) {
        // when you "logout" you are really just removing the data set by loggin in
        delete req.session.user;
        req.session.reset;
        delete req.session.cookies;
        delete req.session.role;
        console.log(req.session);
        res.send("Logged out successfully");
        res.end("logged out!");
    }
    else {
        res.end('No session active');
    }
    ;
});

module.exports = loginRouter;
