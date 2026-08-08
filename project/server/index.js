const express = require('express');
const cors = require('cors');
const dbConfig = require('./dbconfig');
const cookieParse = require('cookie-parser')
const dotEnv = require('dotenv');
dotEnv.config();


// Connect to the database
const app = express();
dbConfig.connectDb();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParse());

const userRouter = require('./routers/user.router.js');
const cookieParser = require('cookie-parser');
app.use('/api/auth', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});