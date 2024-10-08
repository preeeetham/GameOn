import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default MongoConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("MongoDB Connected");
        return connection;
    } catch (error) {
        console.log(error);
    }
};



