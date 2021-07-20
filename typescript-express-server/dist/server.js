"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const app_1 = require("./app");
app_1.default.listen({ port: process.env.PORT }, () => {
    console.log(`Go to http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map