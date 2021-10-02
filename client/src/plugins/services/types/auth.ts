import { BaseUser } from "./user";

export interface AuthPayload {
    token: string;
    user: BaseUser;
}