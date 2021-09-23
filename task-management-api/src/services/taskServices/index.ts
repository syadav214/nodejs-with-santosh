import { HttpStatusCode } from "../../utils/http-response";
import { Task, ITask } from '../../models/task';

export interface IGetTaskResponse {
    data: any;
    status: HttpStatusCode;
}

interface IAllTasks {
    tasks: [],
    count: number
}

const getAllTasks = async (): Promise<IGetTaskResponse> => {
    const allTasks: IAllTasks = {
        tasks: [],
        count: 0
    }
    const tasksResponse: IGetTaskResponse = {
        data: {},
        status: HttpStatusCode.OK
    }

    try {
        const data = await Task.find({});
        if (data) {
            allTasks.tasks = data;
            allTasks.count = data.length;
        }

        tasksResponse.data = allTasks;
    } catch (err) {
        tasksResponse.status = HttpStatusCode.INTERNAL_SERVER;
        console.log('getAllTasks error: ' + err.message);
    }
    return tasksResponse;
}

const getTaskById = async (id: string): Promise<IGetTaskResponse> => {
    const tasks: IGetTaskResponse = {
        data: {},
        status: HttpStatusCode.OK
    }

    try {
        tasks.data = await Task.findById(id);
        if (!tasks.data) {
            tasks.status = HttpStatusCode.NOT_FOUND;
        }
    } catch (err) {
        tasks.data = {};
        tasks.status = HttpStatusCode.INTERNAL_SERVER;
        console.log('getTaskByID error: ' + err.message);
    }
    return tasks;
}

export interface IDMLTaskResponse {
    message: string;
    status: HttpStatusCode;
}

const createTask = async ({ title, description, completionDateTime, reminderDateTime, isCompleted }: ITask): Promise<IDMLTaskResponse> => {
    const dmlTaskResponse: IDMLTaskResponse = {
        message: "task created",
        status: HttpStatusCode.RESOURCE_CREATED,
    }

    const task = new Task({
        title,
        description,
        completionDateTime,
        reminderDateTime,
        isCompleted
    });

    try {
        await task.save();
    } catch (err) {
        dmlTaskResponse.status = HttpStatusCode.INTERNAL_SERVER;
        dmlTaskResponse.message = "task not created";
        console.log('create task error: ' + err.message);
    }
    return dmlTaskResponse;
}

const updateTask = async (id: string, { title, description, completionDateTime, reminderDateTime, isCompleted }: ITask): Promise<IDMLTaskResponse> => {
    const dmlTaskResponse: IDMLTaskResponse = {
        message: "task updated",
        status: HttpStatusCode.OK,
    }

    try {
        const task = await Task.findById(id);

        if (task && task.title) {
            if (title != null) {
                task.title = title;
            }

            if (description != null) {
                task.description = description;
            }

            if (completionDateTime != null) {
                task.completionDateTime = completionDateTime;
            }

            if (reminderDateTime != null) {
                task.reminderDateTime = reminderDateTime;
            }

            if (isCompleted != null) {
                task.isCompleted = isCompleted;
            }

            await Task.findByIdAndUpdate(id, task);
        } else {
            dmlTaskResponse.status = HttpStatusCode.NOT_FOUND;
            dmlTaskResponse.message = "task id is not found.";
        }
    } catch (err) {
        dmlTaskResponse.status = HttpStatusCode.INTERNAL_SERVER;
        dmlTaskResponse.message = "task not updated";
        console.log('task upation error: ' + err.message);
    }
    return dmlTaskResponse;
}

const deleteTask = async (id: string): Promise<IDMLTaskResponse> => {
    const dmlTaskResponse: IDMLTaskResponse = {
        message: "task deleted",
        status: HttpStatusCode.OK,
    }

    try {
        const task = await Task.findById(id);
        if (task && task.title) {
            await task.remove();
        } else {
            dmlTaskResponse.status = HttpStatusCode.NOT_FOUND;
            dmlTaskResponse.message = "task id is not found.";
        }
    } catch (err) {
        dmlTaskResponse.status = HttpStatusCode.INTERNAL_SERVER;
        dmlTaskResponse.message = "task not deleted";
        console.log('task deletion error: ' + err.message);
    }
    return dmlTaskResponse;
}

export {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}