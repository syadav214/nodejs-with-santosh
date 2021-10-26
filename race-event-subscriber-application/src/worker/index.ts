import getToken from "../authentication";
import { IEventResponse } from "../event-processor";
import EventProcessor from "../event-processor";
import { StatusCodes } from "http-status-codes";

const run = async (pollingCounts = 0): Promise<void> => {
    let token: string = await getToken();
    let ep: EventProcessor = new EventProcessor(token);

    let count = 0;
    const longPolling = async (): Promise<void> => {
        if (pollingCounts > 0) {
            ++count;
            if (count > pollingCounts) {
                return;
            }
        }

        const response: IEventResponse = await ep.processEvents();

        if (response.status === StatusCodes.OK || response.status === StatusCodes.NO_CONTENT) {
            await longPolling();
        } else if (response.status === StatusCodes.UNAUTHORIZED) {
            token = await getToken();
            ep = new EventProcessor(token);
            await longPolling();
        }
    }

    await longPolling();
};



export default {
    run
}