const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/.env` });

mongoose.connect(process.env.MONGO_URL, { dbName: "notes" }).then((val) => {
    console.log("Connected to Mongo DB");
}).catch((e) => {
    console.log(e);
    console.log("Failed to connect with DB");
});

const homepage = require("./routes/homepage");
const notes = require("./routes/notes");
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/", homepage);
app.use("/api/notes", notes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Listening`);
})
