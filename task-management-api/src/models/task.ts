import { model, Schema } from 'mongoose';

export interface ITask {
    title: String,
    description: String,
    completionDateTime: Date,
    reminderDateTime: Date,
    isCompleted: Boolean
}

const taskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completionDateTime: {
        type: Date,
        required: true
    },
    reminderDateTime: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Task = model('Task', taskSchema);

export { Task }