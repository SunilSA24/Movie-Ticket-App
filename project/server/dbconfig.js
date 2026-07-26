const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
    } catch (error) {
        console.log('Db connection failed', error);
    }
}

module.exports = {
    connectDb
}