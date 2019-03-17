const express = require('express')
const router = express.Router();

module.exports.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.json({error: "Not logged in"});
}