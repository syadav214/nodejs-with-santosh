import { model, Schema } from "mongoose";

export interface IEvent {
    event: string,
    horse: any,
    time: number
}

const eventSchema: Schema = new Schema({
    event: {
        type: String,
        required: true
    },
    horse: {
        type: Object,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

const Event = model("Event", eventSchema);

export { Event }