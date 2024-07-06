import mongoose from 'mongoose';


export default async function connectDB() {
    try  {
        console.log('Attemping to connect to database ...... ');
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Successfully connected to mongodb database.');
    }catch(error) {
        console.log(`Error occured while connecting to database. ${error.message}`);
        process.exit(1);
    }
}