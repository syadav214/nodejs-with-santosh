"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const app_1 = require("../app");
const request = require("supertest");
beforeAll(() => {
    dotenv.config();
});
describe('server', () => {
    it('forbids access to private requests', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(app_1.default)
            .post('/test')
            .send({
            orderId: null
        });
        // Unauthorized
        expect(response.status).toBe(401);
    }));
});
//# sourceMappingURL=server.spec.js.map