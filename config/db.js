const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = mongoose.connection;

mongoose.connect(process.env.CONNECTION_STRING_DEPLOY, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.once("open", () => { 
    console.log(
        `Successfully connected to database in ${process.env.CONNECTION_STRING_DEPLOY} `
    );
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));


module.exports = mongoose;