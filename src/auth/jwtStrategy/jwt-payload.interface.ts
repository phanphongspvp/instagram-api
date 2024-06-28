import { UserRole } from "src/users/model/user.model";

export interface JwtPayload {
    userId: string;
    name: string;
    username: string;
    roles: UserRole;
    avatar: string;
    logged: boolean;
}