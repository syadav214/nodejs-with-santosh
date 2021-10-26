import mongoose from "mongoose";
const connectedFlag = 1;

const isDbConnectionDown = (): boolean => mongoose.connection.readyState !== connectedFlag;

export {
    isDbConnectionDown
}