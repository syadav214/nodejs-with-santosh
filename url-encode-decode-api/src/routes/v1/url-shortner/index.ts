import express, { Request, Response, Router } from 'express';
import { IEncodedUrlResponse, encodeUrl, IDecodedUrlResponse, decodeUrl } from "../../../services/url-shortner";

const router: Router = express.Router();

router.post("/encode", async (req: Request, res: Response) => {
    const encodeUrlResp: IEncodedUrlResponse = await encodeUrl(req.body.url);
    return res.status(encodeUrlResp.status).json(encodeUrlResp.data);
});

router.post("/decode", async (req: Request, res: Response) => {
    const decodedUrlResp: IDecodedUrlResponse = await decodeUrl(req.body.url);
    return res.status(decodedUrlResp.status).json(decodedUrlResp.data);
});

export { router as shortnerRouter }