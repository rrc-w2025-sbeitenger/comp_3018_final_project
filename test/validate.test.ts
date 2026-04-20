import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { marathonSchemas } from "../src/api/v1/validation/marathonSchemas";
import { HTTP_STATUS } from "../src/constants/httpsConstants";

type MockRequest = Partial<Request> & {
    body: any;
    params: any;
    query: any;
};

type MockResponse = Partial<Response> & {
    status: jest.Mock;
    json: jest.Mock;
};

const createMockResponse = (): MockResponse => {
    const res = {
        status: jest.fn(),
        json: jest.fn(),
    } as MockResponse;

    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);

    return res;
};

const validWeaponBody = {
    weapon_name: "bully_smg",
    damage: 45,
    precision_multiplier: 1.5,
    rate_of_fire: "100 RPM",
    ads_speed: "0.9s",
    equip_speed: "0.8s",
    reload_speed: "1.0s",
    recoil: "0.86%",
    aim_assist: 70,
};

describe("validateRequest middleware", () => {
    let req: MockRequest;
    let res: MockResponse;
    let next: jest.MockedFunction<NextFunction>;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {},
        };
        res = createMockResponse();
        next = jest.fn();
    });

    it("should call next for valid route params", () => {
        req.params = {
            name: "assassin",
        };

        validateRequest(marathonSchemas.getByName)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should strip and trim params when stripParams is true", () => {
        req.params = {
            name: "  assassin  ",
            extra_param: "remove me",
        };

        validateRequest(marathonSchemas.getByName, { stripParams: true })(
            req as Request,
            res as Response,
            next,
        );

        expect(next).toHaveBeenCalledTimes(1);
        expect(req.params).toEqual({
            name: "assassin",
        });
    });

    it("should return 400 and not call next when body validation fails", () => {
        req.body = {
            ...validWeaponBody,
            damage: -1,
            rate_of_fire: "fast",
        };

        validateRequest(marathonSchemas.createWeapon)(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error: Body:"),
        });
        expect(res.json).toHaveBeenCalledWith({
            error: expect.stringContaining("\"damage\" must be greater than or equal to 0"),
        });
        expect(res.json).toHaveBeenCalledWith({
            error: expect.stringContaining("\"rate_of_fire\" must have a postfix of ' RPM'"),
        });
    });

    it("should return 400 when a required create faction field is missing", () => {
        req.body = {
            name: "UESC",
        };

        validateRequest(marathonSchemas.createFaction)(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Body: \"lore\" is required"),
        });
    });
});
