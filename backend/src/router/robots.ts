//Done
import { Router } from 'express';
import { MongooseController } from '../controller/mongoose.controller.js';
import { Robot } from '../models/robots.model.js';

export const robotsController = new MongooseController(Robot);
export const routerRobots = Router();

routerRobots.get('/', robotsController.getAllController);
routerRobots.get('/:id', robotsController.getController);
routerRobots.post('/', robotsController.postController);
routerRobots.patch('/:id', robotsController.patchController);
routerRobots.delete('/:id', robotsController.deleteController);
