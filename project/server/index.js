const express = require('express');
const cors = require('cors');
const dbConfig = require('./dbconfig');
const dotEnv = require('dotenv');
dotEnv.config();


// Connect to the database
const app = express();
dbConfig.connectDb();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

const userRouter = require('./routers/user.router.js');
app.use('/api/auth', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});