//Done but look type date!!!

import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

await mongooseConnect();
export interface iRobot {
    id: string;
    name: string;
    image: string;
    speed: string;
    endurance: string;
    date: string;
}

const robotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    speed: { type: String, required: false },
    endurance: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export const Robot = mongoose.model('Robot', robotSchema);
