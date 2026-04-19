/**
 * @openapi
 * components:
 *   schemas:
 *     SetCustomClaimsRequest:
 *       type: object
 *       required:
 *         - uid
 *         - claims
 *       properties:
 *         uid:
 *           type: string
 *           description: The Firebase user ID of the user receiving the custom claims.
 *           example: "abc123FirebaseUid"
 *         claims:
 *           $ref: '#/components/schemas/AuthorizationOptions'
 *       example:
 *         uid: "abc123FirebaseUid"
 *         claims:
 *           hasRole:
 *             - admin
 *           allowSameUser: true
 */
import { AuthorizationOptions}  from "./authorizationOptions";

export interface SetCustomClaimsRequest {
    uid: string;
    claims: AuthorizationOptions;
}