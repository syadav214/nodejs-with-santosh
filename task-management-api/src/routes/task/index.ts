import express, { Request, Response, Router } from 'express';
import { ITask } from '../../models/task';
import { IGetTaskResponse, getAllTasks, getTaskById, IDMLTaskResponse, createTask, updateTask, deleteTask } from '../../services/taskServices';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const tasks: IGetTaskResponse = await getAllTasks();
    return res.status(tasks.status).send(tasks.data);
});

router.get('/:id', async (req: Request, res: Response) => {
    const tasks: IGetTaskResponse = await getTaskById(req.params.id);
    return res.status(tasks.status).send(tasks.data);
});

router.post('/', async (req: Request, res: Response) => {
    const { title, description, completionDateTime, reminderDateTime, isCompleted }: ITask = req.body;
    const dmlTaskResponse: IDMLTaskResponse = await createTask({ title, description, completionDateTime, reminderDateTime, isCompleted });
    return res.status(dmlTaskResponse.status).send(dmlTaskResponse);
});

router.put('/:id', async (req: Request, res: Response) => {
    const { title, description, completionDateTime, reminderDateTime, isCompleted }: ITask = req.body;
    const dmlTaskResponse: IDMLTaskResponse = await updateTask(req.params.id, { title, description, completionDateTime, reminderDateTime, isCompleted });
    return res.status(dmlTaskResponse.status).send(dmlTaskResponse);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const dmlTaskResponse: IDMLTaskResponse = await deleteTask(req.params.id);
    return res.status(dmlTaskResponse.status).send(dmlTaskResponse);
});

export { router as taskRouter }