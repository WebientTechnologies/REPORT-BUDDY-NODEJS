const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const sls = require("serverless-http");
const router = require('./routes/route');

const cors = require('cors');
app.use('/uploads', express.static('uploads'));
app.use(
    cors({
        origin: [
            "http://localhost:3000",
           "https://prema-consultancy.vercel.app"
          ],
          credentials: true,
    })
  );

app.use('/uploads', express.static('uploads'));
// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());
app.use(cookieParser());


//mount the todo API routes
app.use("/api/v1", router);

module.exports.handler = sls(app);

//start serve
app.listen(PORT, () =>{
    console.log(`Server started Successfully at ${PORT}`);
})

//connect to the database
const dbConnect = require("./config/database");
dbConnect();