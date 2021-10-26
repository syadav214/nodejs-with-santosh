import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import logger from "./logger";
import worker from "./worker";

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONN_STRING || "", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        logger.info("Connected to MongoDB");
    } catch (err) {
        logger.info("Not able to connect to MongoDB");
    }
})();

process.on("uncaughtException", (err: any) => {
    logger.error("There was an uncaught error: " + err);
    mongoose.connection.close(() => {
        logger.info("disconnected database after uncaughtException");
    });
    process.exit(1);
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        logger.info("disconnected database through app termination");
        process.exit(0);
    });
});

worker.run();