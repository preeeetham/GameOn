import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default MongooseConnection = {
    connectDB: async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    },
};



