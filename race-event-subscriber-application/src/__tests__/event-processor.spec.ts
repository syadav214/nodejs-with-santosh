import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { Event } from "../model/event";
import { IEventResponse } from "../event-processor";
import EventProcessor from "../event-processor";

beforeAll(async () => {
    (async () => {
        try {
            await mongoose.connect(process.env.TEST_MONGO_CONN_STRING || "", {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            console.log("Connected to MongoDB");
        } catch (err) {
            console.log("Not able to connect to MongoDB");
        }
    })();
});

describe("event-processor", () => {
    it("eventReceived", async () => {
        jest.spyOn(axios, "get").mockImplementationOnce(() => Promise.resolve({
            data: {
                event: "start",
                horse: {
                    id: 8,
                    name: "Dazzle"
                },
                time: 0
            },
            status: 200
        }));

        const ep: EventProcessor = new EventProcessor("token");
        const response: IEventResponse = await ep.processEvents();
        expect(response.status).toBe(StatusCodes.OK);
    });

    it("eventNotReceived", async () => {
        jest.spyOn(axios, "get").mockImplementationOnce(() => Promise.resolve({
            data: {},
            status: 204
        }));

        const ep: EventProcessor = new EventProcessor("token");
        const response: IEventResponse = await ep.processEvents();
        expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });

    it("token not valid", async () => {
        jest.spyOn(axios, "get").mockImplementationOnce(() => Promise.resolve({
            data: {},
            status: 401
        }));

        const ep: EventProcessor = new EventProcessor("token");
        const response: IEventResponse = await ep.processEvents();
        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });
});

afterAll(async () => {
    await Event.deleteMany({});
    await mongoose.connection.close()
});