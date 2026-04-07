/**
 * @openapi
 * components:
 *   schemas:
 *     HealthCheckResponse:
 *       type: object
 *       required:
 *         - status
 *         - uptime
 *         - timestamp
 *         - version
 *       properties:
 *         status:
 *           type: number
 *           description: The HTTP status code of the server
 *           example: 200
 *         uptime:
 *           type: number
 *           description: The number of seconds the server has been running
 *           example: 123.456
 *         timestamp:
 *           type: string
 *           description: The ISO timestamp of when the health check was performed
 *           example: "2024-01-01T00:00:00.000Z"
 *         version:
 *           type: string
 *           description: The current version of the API
 *           example: "1.0.0"
 *       example:
 *         status: 200
 *         uptime: 123.456
 *         timestamp: "2024-01-01T00:00:00.000Z"
 *         version: "1.0.0"
 */
export interface HealthCheckResponse{
    status: number;
    uptime: number;
    timestamp:string;
    version: string;
}