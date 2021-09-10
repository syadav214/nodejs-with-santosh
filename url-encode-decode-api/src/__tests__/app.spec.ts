import app from "../app";
import supertest, { Response } from "supertest";
import { StatusCodes } from "http-status-codes";
import { IEncodedUrl, IDecodedUrl } from "../services/url-shortner";

const mainRoute: string = "/api/v1";
const longUrl: string = "https://www.google.com";
let geneartedShortUrl: string = "";

describe("GET / - health endpoint", () => {
    it("health API Request", async () => {
        const result: Response = await supertest(app).get(`${mainRoute}/health`);
        expect(result.text).toEqual("healthy!");
        expect(result.statusCode).toEqual(200);
    });
});

describe("POST / - encode endpoint", () => {
    const route = `${mainRoute}/url-shortner/encode`;

    it("with proper body Request", async () => {
        const result: Response = await supertest(app).post(route).send({ url: longUrl });
        const data: IEncodedUrl = result.body;

        expect(data.encodedUrl !== "").toEqual(true);

        geneartedShortUrl = data.encodedUrl;

        expect(result.statusCode).toEqual(StatusCodes.OK);
    });

    it("with no body Request", async () => {
        const result: Response = await supertest(app).post(route);
        const data: IEncodedUrl = result.body;
        
        expect(data.error !== "").toEqual(true);
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });

    it("with invalid url Request", async () => {
        const result: Response = await supertest(app).post(route).send({ url: "invalid-url" });
        const data: IEncodedUrl = result.body;
        
        expect(data.error !== "").toEqual(true);
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});

describe("POST / - decode endpoint", () => {
    const route = `${mainRoute}/url-shortner/decode`;

    it("with proper body Request", async () => {
        const result: Response = await supertest(app).post(route).send({ url: geneartedShortUrl });
        const data: IDecodedUrl = result.body;
        
        expect(data.decodedUrl).toEqual(longUrl);
        expect(result.statusCode).toEqual(StatusCodes.OK);
    });

    it("with no body Request", async () => {
        const result: Response = await supertest(app).post(route);
        const data: IDecodedUrl = result.body;
        
        expect(data.error !== "").toEqual(true);
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });

    it("with invalid url Request", async () => {
        const result: Response = await supertest(app).post(route).send({ url: "invalid-url" });
        const data: IDecodedUrl = result.body;
        
        expect(data.error !== "").toEqual(true);
        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});