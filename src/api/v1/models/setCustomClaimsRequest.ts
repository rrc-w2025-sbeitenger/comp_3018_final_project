import { AuthorizationOptions}  from "./authorizationOptions";

export interface SetCustomClaimsRequest {
    uid: string;
    claims: AuthorizationOptions;
}