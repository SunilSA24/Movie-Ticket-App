const express = require('express');
const dbConfig = require('./dbconfig');
const dotEnv = require('dotenv');
dotEnv.config();

// Connect to the database
dbConfig.connectDb();
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});