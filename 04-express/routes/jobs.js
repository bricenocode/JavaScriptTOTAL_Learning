import { Router } from 'express';
import { JobsController } from '../controllers/jobs.js';

const jobsRouter = Router();

jobsRouter.get('/', JobsController.getAll);
jobsRouter.get('/:id', JobsController.getById);// Idempotente: porque el sistema queda igual si llamas varias veces a la misma URL
jobsRouter.post('/',  JobsController.create);
jobsRouter.put('/:id', JobsController.update);
jobsRouter.delete('/:id', JobsController.delete);

export { jobsRouter };