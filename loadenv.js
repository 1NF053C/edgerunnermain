"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var envFilePath = path.resolve(__dirname, '.env');
var envFileContent = fs.readFileSync(envFilePath, { encoding: 'utf-8' });
var requiredVars = [];
var conditionalVars = {};
envFileContent.split('\n').forEach(function (line) {
    line = line.trim();
    if (line && !line.startsWith('#')) {
        var _a = line.split('#'), keyValue = _a[0], comment = _a.slice(1);
        var _b = keyValue.split('=').map(function (part) { return part.trim(); }), key = _b[0], value = _b[1];
        if (comment.length > 0) {
            var commentText = comment.join('#').trim();
            if (commentText === 'required') {
                requiredVars.push(key);
            }
            else if (commentText.startsWith('required_if=')) {
                var condition = commentText.split('=')[1].trim();
                if (!conditionalVars[condition]) {
                    conditionalVars[condition] = [];
                }
                conditionalVars[condition].push(key);
            }
        }
        process.env[key] = value;
    }
});
requiredVars.forEach(function (varName) {
    if (!process.env[varName]) {
        throw new Error("Missing required environment variable: ".concat(varName));
    }
});
Object.keys(conditionalVars).forEach(function (condition) {
    if (process.env[condition] === 'true') {
        conditionalVars[condition].forEach(function (varName) {
            if (!process.env[varName]) {
                throw new Error("Missing required environment variable: ".concat(varName, " because ").concat(condition, " is set"));
            }
        });
    }
});
console.log('Environment variables loaded successfully.');
