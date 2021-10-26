import axios from "axios";
import { IEvent, Event } from "../model/event";
import logger from "../logger";
import { StatusCodes } from "http-status-codes";
import { isDbConnectionDown } from "../utils";

export interface IEventResponse {
    status: number,
    data: IEvent
}

const simulatorUrl: string = process.env.SIMULATOR_URL || "";
const simulatorEventPath: string = simulatorUrl + "/results";

class EventProcessor {
    token: string;

    constructor(_token: string) {
        this.token = _token;
    }

    async getEvents(): Promise<IEventResponse> {
        const eventResponse: IEventResponse = {
            status: StatusCodes.OK,
            data: {
                event: "",
                horse: {},
                time: 0
            }
        };

        const options = {
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            }
        };

        try {
            const result = await axios.get(simulatorEventPath, options);

            if (result.status === StatusCodes.OK) {
                eventResponse.data = result.data;
                logger.info("Event received");
            } else if (result.status === StatusCodes.UNAUTHORIZED) {
                eventResponse.status = result.status;
                logger.error("Event unauthorized");
            } else if (result.status === StatusCodes.NO_CONTENT) {
                eventResponse.status = result.status;
                logger.info("No event received");
            }
        } catch (err: any) {
            if (err && err.response && err.response.status === StatusCodes.UNAUTHORIZED) {
                eventResponse.status = err.response.status;
                logger.error("Event unauthorized");
            } else {
                logger.error("Event received error: " + err);
            }
        }
        return eventResponse;
    }

    async processEvents(): Promise<IEventResponse> {
        const eventResponse: IEventResponse = await this.getEvents();

        if (eventResponse.status === StatusCodes.OK) {
            const eventModel = new Event({
                event: eventResponse.data.event,
                horse: eventResponse.data.horse,
                time: eventResponse.data.time
            });

            try {
                await eventModel.save();
                logger.info("Event saved");
            } catch (err) {
                if (isDbConnectionDown()) {
                    eventResponse.status = StatusCodes.INTERNAL_SERVER_ERROR;
                    throw new Error("Database connection is down");
                } else {
                    logger.error("Event saving error: " + err);
                }
            }
        }
        return eventResponse;
    }
}

export default EventProcessor;