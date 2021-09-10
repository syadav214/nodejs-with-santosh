import { StatusCodes } from "http-status-codes";
import validUrl from 'valid-url';
import { isKeyExists, getLongUrl, setLongUrl } from "../../datastore";
import { nanoid } from 'nanoid';

const MAX_DUPLICATE_CHECK_UNIQUEID: number = 3, UNIQUEID_LENGTH: number = 10;

export interface IShortUrlKey {
    key: string;
    count: number;
}

const getShortUrlKey = (uniqueIdGenerator: any): IShortUrlKey => {
    const shortUrlKey: IShortUrlKey = {
        key: uniqueIdGenerator(UNIQUEID_LENGTH),
        count: 0
    }

    if (isKeyExists(shortUrlKey.key)) {
        // nanoid: For there to be a one in a billion chance of duplication, 
        // 103 trillion version 4 IDs must be generated.
        // to avoid duplication, we are checking 3 times
        while (true) {
            if (shortUrlKey.count === MAX_DUPLICATE_CHECK_UNIQUEID) {
                break;
            }
            shortUrlKey.key = uniqueIdGenerator(UNIQUEID_LENGTH);

            if (!isKeyExists(shortUrlKey.key)) {
                break;
            }
            shortUrlKey.count++;
        }

    }
    return shortUrlKey;
}

interface IValidateUrl {
    valid: boolean;
    error?: string;
}

const validateUrl = (url: string): IValidateUrl => {
    const validateUrlResp: IValidateUrl = {
        valid: true
    }

    if (!url) {
        validateUrlResp.valid = false;
        validateUrlResp.error = "url is required";
        return validateUrlResp;
    }

    if (!validUrl.isUri(url)) {
        validateUrlResp.valid = false;
        validateUrlResp.error = "invalid url";
        return validateUrlResp;
    }

    return validateUrlResp;
}


export interface IEncodedUrl {
    encodedUrl: string;
    error?: string;
}

export interface IEncodedUrlResponse {
    status: StatusCodes;
    data: IEncodedUrl;
}

const encodeUrl = (url: string): IEncodedUrlResponse => {
    let status: StatusCodes = StatusCodes.OK;
    const data: IEncodedUrl = {
        encodedUrl: ""
    };
    const validateUrlResp: IValidateUrl = validateUrl(url);

    if (validateUrlResp.valid) {
        try {
            const shortUrlKey: IShortUrlKey = getShortUrlKey(nanoid);

            if (shortUrlKey.count === MAX_DUPLICATE_CHECK_UNIQUEID) {
                status = StatusCodes.INTERNAL_SERVER_ERROR;
                data.error = "something went wrong. Error Code: 101";
            } else {
                setLongUrl(shortUrlKey.key, url);
                data.encodedUrl = `${process.env.SHORT_URL_DOMAIN}/${shortUrlKey.key}`;
            }
        } catch (error) {
            status = StatusCodes.INTERNAL_SERVER_ERROR;
            data.error = "something went wrong. Error Code: 100";
        }
    } else {
        status = StatusCodes.BAD_REQUEST;
        data.error = validateUrlResp.error;
    }

    return {
        data,
        status
    };
};


export interface IDecodedUrl {
    decodedUrl: string;
    error?: string;
}

export interface IDecodedUrlResponse {
    status: StatusCodes;
    data: IDecodedUrl;
}

const decodeUrl = (url: string): IDecodedUrlResponse => {
    let status: StatusCodes = StatusCodes.OK;
    const data: IDecodedUrl = {
        decodedUrl: ""
    };
    const validateUrlResp: IValidateUrl = validateUrl(url);

    if (validateUrlResp.valid) {
        try {
            const shortUrlDomain: string = process.env.SHORT_URL_DOMAIN || "";
            const key: string = url.replace(`${shortUrlDomain}/`, "");

            if (isKeyExists(key)) {
                data.decodedUrl = getLongUrl(key);
            } else {
                status = StatusCodes.BAD_REQUEST;
                data.error = "invalid url";
            }
        } catch (error) {
            status = StatusCodes.INTERNAL_SERVER_ERROR;
            data.error = "something went wrong. Error Code: 200";
        }
    } else {
        status = StatusCodes.BAD_REQUEST;
        data.error = validateUrlResp.error;
    }

    return {
        data,
        status
    };;
};

export { getShortUrlKey, encodeUrl, decodeUrl };