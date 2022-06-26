import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { MongooseController } from './mongoose.controller.js';

describe('Given a instantiated controller MongooseController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction = jest.fn();
    let mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    let mongooseController = new MongooseController(
        mockModel as unknown as Model<{}>
    );
    beforeEach(() => {
        req = {
            params: { id: '1' },
        };
        res = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
    });
    describe('When method getAllController is called', () => {
        test('Then resp.end should be called', async () => {
            mockModel.find = jest.fn();
            await mongooseController.getAllController(
                req as Request,
                res as Response
            );
            expect(res.end).toHaveBeenCalled();
        });
    });

    describe('When method getController is called', () => {
        test('And response is ok, then resp.end should be called with data', async () => {
            const result = { test: 'test' };
            mockModel.findById = jest.fn().mockResolvedValue(result);
            await mongooseController.getController(
                req as Request,
                res as Response
            );
            expect(res.end).toHaveBeenCalledWith(JSON.stringify(result));
        });
        test('And response is not ok, then resp.end should be called without data', async () => {
            const result = null;
            mockModel.findById = jest.fn().mockResolvedValue(result);
            await mongooseController.getController(
                req as Request,
                res as Response
            );
            expect(res.end).toHaveBeenCalledWith(JSON.stringify({}));
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('When method postController is called', () => {
        test('Then resp.end should be called with data', async () => {
            const result = { test: 'test' };
            mockModel.create = jest.fn().mockResolvedValue(result);
            await mongooseController.postController(
                req as Request,
                res as Response,
                next as NextFunction
            );
            expect(res.end).toHaveBeenCalledWith(JSON.stringify(result));
        });
        test('Then in the case of error, next should be called', async () => {
            const error = new Error('test');
            mockModel.create = jest.fn().mockRejectedValue(error);
            await mongooseController.postController(
                req as Request,
                res as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(error);
        });

        describe('When method patchController is called', () => {
            test('Then resp.end should be called with data', async () => {
                const result = { test: 'test' };
                mockModel.findByIdAndUpdate = jest
                    .fn()
                    .mockResolvedValue(result);
                await mongooseController.patchController(
                    req as Request,
                    res as Response
                );
                expect(res.end).toHaveBeenCalledWith(JSON.stringify(result));
            });
        });

        describe('When method deleteController is called', () => {
            test('Then res.end should be called with JSON.stringify({ deleteContent })', async () => {
                const result = '';
                mockModel.findByIdAndDelete = jest
                    .fn()
                    .mockResolvedValue(result);
                await mongooseController.deleteController(
                    req as Request,
                    res as Response
                );
                expect(res.end).toHaveBeenCalledWith(
                    JSON.stringify({ deleteContent: result })
                );
            });
        });
    });
});
