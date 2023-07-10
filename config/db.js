const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on('connected', function() {
            console.log('Connected to MongoDB');
        });

        mongoose.connection.on('error', function(err) {
            console.log('MongoDB connection error: ' + err);
        });

        mongoose.connection.on('disconnected', function() {
            console.log('Disconnected from MongoDB');
        });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;