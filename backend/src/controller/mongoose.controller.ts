//Done
/* eslint-disable no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import { Model } from 'mongoose';
export class MongooseController<T> {
    constructor(public model: Model<T>) {}

    getAllController = async (req: Request, res: Response) => {
        req;
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(await this.model.find()));
    };
    getController = async (req: Request, res: Response) => {
        res.setHeader('Content-type', 'application/json');
        const result = await this.model.findById(req.params.id);
        if (result) {
            res.end(JSON.stringify(result));
        } else {
            res.status(404);
            res.end(JSON.stringify({}));
        }
    };

    postController = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const newContent = await this.model.create(req.body);
            res.setHeader('Content-type', 'application/json');
            res.status(201);
            res.end(JSON.stringify(newContent));
        } catch (error) {
            next(error);
        }
    };

    patchController = async (req: Request, res: Response) => {
        const updatedContent = await this.model.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(updatedContent));
    };
    deleteController = async (req: Request, res: Response) => {
        const deleteContent = await this.model.findByIdAndDelete(req.params.id);
        res.end(JSON.stringify({ deleteContent }));
    };
}
