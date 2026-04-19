/**
 * @openapi
 * components:
 *   schemas:
 *     AuthorizationOptions:
 *       type: object
 *       required:
 *         - hasRole
 *       properties:
 *         hasRole:
 *           type: array
 *           description: The roles that are allowed to access the route.
 *           items:
 *             type: string
 *             enum:
 *               - admin
 *               - user
 *           example:
 *             - admin
 *         allowSameUser:
 *           type: boolean
 *           description: Allows a user to access their own resource even if they do not have one of the required roles.
 *           example: true
 *       example:
 *         hasRole:
 *           - admin
 *         allowSameUser: true
 */
export interface AuthorizationOptions {
    hasRole: Array<"admin" | "user">;
    allowSameUser?: boolean;
}