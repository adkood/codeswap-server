const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

const router = require("./routes/roomRoutes");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
//mongo db connections
const dbConfig = {
    development: {
        uri: "mongodb+srv://ashutosh:123123123@cluster0.jx263.mongodb.net/codeswap-dev?retryWrites=true&w=majority",
        options: {
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
        },
    },
    production: {
        uri: "mongodb+srv://ashutosh:123123123@cluster0.jx263.mongodb.net/codeswap-prod?retryWrites=true&w=majority",
        options: {
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
        },
    },
};

// Get the current environment
const environment = process.env.NODE_ENV || "development";

// Connect to the appropriate MongoDB database based on the environment
const { uri, options } = dbConfig[environment];
mongoose
    .connect(uri, options)
    .then(() => {
        console.log(`Connected to ${environment} database`);
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

// routes and middleware
app.use("/api", jsonParser, router);

//port to listen
const port = 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
