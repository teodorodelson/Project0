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
var TranscriptRouter = express_1.Router();
var fs_1 = require("fs");
TranscriptRouter.get('/studDashboard', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, name_holder, result, _a, _b, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fs_1.appendFile('logs.txt', "\nA request has been made to " + req.url + " with the method of + " + req.method + " " + Date.now().toString(), function (err) {
                    if (err)
                        throw err;
                });
                return [4 /*yield*/, index_1.pool.connect()];
            case 1:
                client = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 8, 9, 10]);
                if (!(req.session && req.session.user !== undefined)) return [3 /*break*/, 6];
                if (!(req.session.role === 'Student')) return [3 /*break*/, 4];
                console.log(req.session);
                console.log('Welcome to your dashbaord');
                name_holder = req.session.user;
                result = client.query("SELECT id, username, email, lname, fname, join_date, contact FROM user_accounts WHERE username = '" + name_holder + "';");
                _b = (_a = res).send;
                return [4 /*yield*/, result];
            case 3:
                _b.apply(_a, [(_c.sent()).rows]);
                return [3 /*break*/, 5];
            case 4:
                res.status(403);
                res.send('Unauthorized Access');
                _c.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(403);
                res.send('Unauthorized Access');
                _c.label = 7;
            case 7: return [3 /*break*/, 10];
            case 8:
                err_1 = _c.sent();
                console.log(err_1);
                res.end('Failed to retrieve information from the database');
                return [3 /*break*/, 10];
            case 9:
                client && client.release();
                res.end();
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); });
TranscriptRouter.patch('/changeContact', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, name_holder, new_contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs_1.appendFile('logs.txt', "\nA request has been made to " + req.url + " with the method of + " + req.method + " " + Date.now().toString(), function (err) {
                    if (err)
                        throw err;
                });
                return [4 /*yield*/, index_1.pool.connect()];
            case 1:
                client = _a.sent();
                try {
                    if (req.session && req.session.user !== undefined) {
                        if (req.session.role === 'Student') {
                            console.log(req.session);
                            name_holder = req.session.user;
                            new_contact = req.body.new_contact;
                            console.log('contact info successfully changed');
                            client.query("UPDATE public.user_accounts SET  contact='" + new_contact + "'WHERE username = '" + name_holder + "';");
                            res.redirect('/studDashboard');
                        }
                        else {
                            res.status(403);
                            res.send('Unauthorized Access');
                        }
                    }
                    else {
                        res.status(403);
                        res.send('Unauthorized Access');
                    }
                }
                catch (err) {
                    console.log(err);
                    res.end('Failed to retrieve information from the database');
                }
                finally {
                    client && client.release();
                    res.end();
                }
                return [2 /*return*/];
        }
    });
}); });
TranscriptRouter.get('/records', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, name_holder, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs_1.appendFile('logs.txt', "\nA request has been made to " + req.url + " with the method of + " + req.method + " " + Date.now().toString(), function (err) {
                    if (err)
                        throw err;
                });
                return [4 /*yield*/, index_1.pool.connect()];
            case 1:
                client = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 8, 9, 10]);
                if (!(req.session && req.session.user !== undefined)) return [3 /*break*/, 6];
                if (!(req.session.role === 'Student')) return [3 /*break*/, 4];
                name_holder = req.session.user;
                return [4 /*yield*/, client.query("SELECT course_name, course_accro FROM user_course where username = '" + name_holder + "';")];
            case 3:
                result = _a.sent();
                res.send(result.rows);
                return [3 /*break*/, 5];
            case 4:
                res.status(403);
                res.send('Unauthorized Access');
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.send('Unauthorized Access');
                res.status(403);
                _a.label = 7;
            case 7: return [3 /*break*/, 10];
            case 8:
                err_2 = _a.sent();
                console.log(err_2);
                res.end('Failed to retrieve information from the database');
                return [3 /*break*/, 10];
            case 9:
                client && client.release();
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); });
TranscriptRouter.patch('/changePassword', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, name_holder, new_password;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs_1.appendFile('logs.txt', "\nA request has been made to " + req.url + " with the method of + " + req.method + " " + Date.now().toString(), function (err) {
                    if (err)
                        throw err;
                });
                return [4 /*yield*/, index_1.pool.connect()];
            case 1:
                client = _a.sent();
                try {
                    if (req.session && req.session.user !== undefined) {
                        if (req.session.role === 'Student') {
                            console.log(req.session);
                            name_holder = req.session.user;
                            new_password = req.body.new_password;
                            console.log('Password successfully changed');
                            client.query("UPDATE public.user_accounts SET password='" + new_password + "'WHERE username = '" + name_holder + "';");
                            res.redirect('/studDashboard');
                        }
                        else {
                            res.status(403);
                            res.send('Unauthorized Access');
                        }
                    }
                    else {
                        res.status(403);
                        res.send('Unauthorized Access');
                    }
                }
                catch (err) {
                    console.log(err);
                    res.end('Failed to retrieve information from the database');
                }
                finally {
                    client && client.release();
                    res.end();
                }
                return [2 /*return*/];
        }
    });
}); });
module.exports = TranscriptRouter;