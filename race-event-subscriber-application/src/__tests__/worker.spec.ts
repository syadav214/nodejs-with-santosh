import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Event } from "../model/event";
import worker from "../worker";

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

describe("worker", () => {
    jest.setTimeout(50000);
    it("execute run", async () => {
        await worker.run(10);
        expect(await Event.countDocuments({})).toBeGreaterThan(0);
    });
});

afterAll(async () => {
    await Event.remove({});
    await mongoose.connection.close();
});