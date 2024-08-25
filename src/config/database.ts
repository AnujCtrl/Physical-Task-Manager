import mongoose from 'mongoose';
import logger from './logger';

export async function connectToDatabase() {
    try{
        await mongoose.connect('mongodb://localhost:27017/physical_task_manager');
        logger.info('Connected to the database');
    }catch(err){
        logger.error(`Error connecting to the database: ${err}`);
        process.exit(1);
    }
}