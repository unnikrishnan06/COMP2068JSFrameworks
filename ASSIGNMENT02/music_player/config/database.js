const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("DB connected");
    } catch (error) {
        console.log("DB connection failed");
        console.log(error);
    }
}

module.exports = connectDB;