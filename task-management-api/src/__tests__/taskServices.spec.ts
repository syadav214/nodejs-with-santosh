import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Task, ITask } from '../models/task';
import { HttpStatusCode } from "../utils/http-response";

import { IGetTaskResponse, getAllTasks, getTaskById, IDMLTaskResponse, createTask, updateTask, deleteTask } from '../services/taskServices';

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_CONN_STRING || '', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }, () => {
        console.log('connected to database');
    });
});

const task: ITask = { title: "test", description: "test", completionDateTime: new Date(), reminderDateTime: new Date(), isCompleted: false };

describe('taskServices', () => {
    it('createTask', async () => {
        const dmlTaskResponse: IDMLTaskResponse = await createTask(task);
        expect(dmlTaskResponse.status).toBe(HttpStatusCode.RESOURCE_CREATED);
    });

    let id: string = "";
    it('getAllTasks', async () => {
        const getAllTasksResponse: IGetTaskResponse = await getAllTasks();
        expect(getAllTasksResponse.data.count).toBeGreaterThan(0);
        id = getAllTasksResponse.data.tasks[0]._id;
    });

    it('getTaskById', async () => {
        const tasks: IGetTaskResponse = await getTaskById(id);
        expect(tasks.data.title).toBe(task.title);
    });

    it('updateTask', async () => {
        task.title = "test2";
        const dmlTaskResponse: IDMLTaskResponse = await updateTask(id, task);
        expect(dmlTaskResponse.status).toBe(HttpStatusCode.OK);
    });

    it('deleteTask', async () => {
        const dmlTaskResponse: IDMLTaskResponse = await deleteTask(id);
        expect(dmlTaskResponse.status).toBe(HttpStatusCode.OK);
    });
});

afterAll(async () => {
    await Task.remove({});
    await mongoose.connection.close()
});