//Done but look type date and number!!!

import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

await mongooseConnect();
export interface iRobot {
    id: string;
    name: string;
    image: string;
    speed: number;
    endurance: number;
    date: string;
}

const robotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    speed: { type: Number, required: false },
    endurance: { type: Number, required: true },
    date: String,
});

export const Robot = mongoose.model('Robot', robotSchema);
