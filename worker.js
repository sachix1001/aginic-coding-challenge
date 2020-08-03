const express = require("express");
const db = require("./server/knex");

console.log("worker is working!");
setInterval(() => console.log("worker is working!"), 3000);
