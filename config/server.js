const express = require("express");
require('dotenv').config();

const port = process.env.PORT;
const app = express();


app.use(require("./app"));
app.listen(port, () => console.log(`Server is up and running on port ${port}`));