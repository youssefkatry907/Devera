// Global modules
const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config();
const session = require("express-session");


const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
    // uri: "mongodb://localhost:27017/devera",
    uri: `${process.env.CONNECTION_STRING_DEPLOY}`,
    collection: "mySessions",
});

app.use(
    session({
        secret: "shekoo 2001",
        resave: false,
        saveUninitialized: false,
        store,
    })
);

app.use(session({ secret: "devera" }));
require("./db");
app.use(require("../routes/user.routes"));

//Cors Configuration
app.use(async (req, res, next) => {
    res.locals.session = req.session;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    res.header("Access-Control-Allow-Credentials", true);
    res.header("Cache-Control", "no-store,no-cache,must-revalidate");
    res.header("Vary", "Origin");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
        return res.status(200).json({});
    }
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;