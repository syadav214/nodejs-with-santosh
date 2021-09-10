import { IShortUrlKey, getShortUrlKey } from "../services/url-shortner";
import { setLongUrl } from '../datastore';
import { nanoid } from 'nanoid';

describe("getShortUrlKey", () => {
    it("getShortUrlKey with custom uniqueIdGenerator", async () => {
        const testKey: string = "1232324343";
        const uniqueIdGenerator = (size: number): string => {
            return testKey;
        }
        setLongUrl(testKey, "http://www.google.com");
        
        const shortUrlKey: IShortUrlKey = getShortUrlKey(uniqueIdGenerator);

        expect(shortUrlKey.count).toEqual(3);
    });

    it("getShortUrlKey with nanoid", async () => {
        const shortUrlKey: IShortUrlKey = getShortUrlKey(nanoid);

        expect(shortUrlKey.key !== "").toEqual(true);
        expect(shortUrlKey.count).toEqual(0);
    });
});
