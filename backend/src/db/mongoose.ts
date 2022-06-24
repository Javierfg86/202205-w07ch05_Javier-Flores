//Done

import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export async function mongooseConnect() {
    const url = process.env.URL_MONGO;
    mongoose.connect(url as string);
}
