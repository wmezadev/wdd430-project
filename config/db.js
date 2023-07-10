const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error: ' + err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;