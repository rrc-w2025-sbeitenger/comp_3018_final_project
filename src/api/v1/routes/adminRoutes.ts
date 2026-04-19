import express from "express";
import { setCustomClaims } from "../controllers/adminControllers";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const adminRoutes: express.Router = express.Router();

/**
 * @openapi
 * /admin/setClaims:
 *   post:
 *     summary: Set Firebase custom claims for a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetCustomClaimsRequest'
 *           example:
 *             uid: "abc123FirebaseUid"
 *             claims:
 *               hasRole:
 *                 - admin
 *               allowSameUser: true
 *     responses:
 *       '200':
 *         description: Custom claims were set successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             example: "Custom claims set for user: abc123FirebaseUid. User must obtain a new token for changes to take effect."
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
adminRoutes.post("/admin/setClaims", authenticate, isAuthorized({hasRole: ["admin"], allowSameUser: true}), setCustomClaims);

export default adminRoutes;
