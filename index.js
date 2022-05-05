const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/notes").then((val) => {
    console.log("Connected to Mongo DB");
}).catch((e) => {
    console.log("Failed to connect with DB");
});

const homepage = require("./routes/homepage");
const notes = require("./routes/notes");

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use("/", homepage);
app.use("/api/notes", notes);

const PORT = process.env.PORT || 3000;
const hostName = "192.168.236.243";
app.listen(PORT, hostName, () => {
    console.log(`Server Listening ${hostName}:${PORT}`);
})
