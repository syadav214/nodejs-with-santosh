import axios from "axios";
import getToken from "../authentication";

jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve({
    data: {
        token: "thisistoken",
    },
    status: 200
}));


describe("authentication", () => {
    it("tokenReceive", async () => {
        expect(await getToken()).toBe("thisistoken");
    });
});
