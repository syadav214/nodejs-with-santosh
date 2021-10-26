import axios from "axios";
import logger from "../logger";

const simulatorUrl: string = process.env.SIMULATOR_URL || "";
const simulatorAuthPath: string = simulatorUrl + "/auth";
const email: string = process.env.SIMULATOR_EMAIL || "";
const password: string = process.env.SIMULATOR_PASSWORD || "";

const options = {
    headers: {
        "Content-Type": "application/json",
    }
};

const getToken = async (): Promise<string> => {
    let token = "";
    try {
        const result = await axios.post(simulatorAuthPath, {
            email, password
        }, options);
        token = result.data.token;
    } catch (err) {
        logger.error("authentication error: " + err);
    }
    return token;
}

export default getToken;


