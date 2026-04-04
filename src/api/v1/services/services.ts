import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { HealthCheckResponse } from "../models/healthCheckResponse";

/**
 * returns healthCheck server status.
 * @returns {HealthCheckResponse} - returns a healthCheckResponse object.
 */
export const getHealthStatusService = (): HealthCheckResponse => {
    return {
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    };
}