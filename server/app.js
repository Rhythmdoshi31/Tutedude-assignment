const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Progress = require('./models/progressModel');
const mergeIntervals = require('./utils/mergeIntervals');  // Importing the merge function
require("./config/mongoose")
const app = express();
const port = 3000;

// Allow any origin to access the backend (not recommended for production but useful for debugging)
app.use(cors());
app.use(bodyParser.json());

const progressRouter = require("./routes/progressRoutes");

app.get("/", (req, res) => {
    res.send("hello");
})

app.use("/api/progress", progressRouter);

// Start the server
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
