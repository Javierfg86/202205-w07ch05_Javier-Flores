//Done

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router/home.js';
import { routerRobots } from './router/robots.js';
export const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use('/', routerRobots);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    req;
    res;
    next;
    console.log(error.message);
    let status = 500;
    if (error.name === 'ValidationError') {
        status = 406;
    }
    res.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    res.end(JSON.stringify(result));
});
