import { getHealthStatusService } from "../src/api/v1/services/services";
import { HTTP_STATUS } from "../src/constants/httpsConstants";

describe("getHealthStatusService", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should return a valid health check response object", () => {
        const result = getHealthStatusService();

        expect(result).toHaveProperty("status");
        expect(result).toHaveProperty("uptime");
        expect(result).toHaveProperty("timestamp");
        expect(result).toHaveProperty("version");
    });

    it("should return status 200", () => {
        const result = getHealthStatusService();

        expect(result.status).toBe(HTTP_STATUS.OK);
    });

    it("should return a valid ISO timestamp", () => {
        const fixedDate = new Date("2024-01-01T00:00:00.000Z");
        jest.setSystemTime(fixedDate.getTime());

        const result = getHealthStatusService();

        expect(result.timestamp).toBe("2024-01-01T00:00:00.000Z");
    });

    it("should return the correct version", () => {
        const result = getHealthStatusService();

        expect(result.version).toBe("1.0.0");
    });

    it("should return a valid uptime as a number", () => {
        const result = getHealthStatusService();

        expect(typeof result.uptime).toBe("number");
        expect(result.uptime).toBeGreaterThanOrEqual(0);
    });
});
