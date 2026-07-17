console.log("1. Starting diagnose...");
const express = require('express');
console.log("2. Express loaded");
const { PORT } = require('./config/serverconfig');
console.log("3. PORT is:", PORT);

function tryRequire(path) {
    try {
        console.log(`Requiring ${path}...`);
        const res = require(path);
        console.log(`Successfully required ${path}`);
        return res;
    } catch (err) {
        console.error(`Error requiring ${path}:`, err);
        throw err;
    }
}

tryRequire('./routes/index');
