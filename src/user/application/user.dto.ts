import { UserModel } from "../domain/user.model";

export interface UserResponseDto {
    id: string,
    firstName: string
    lastName: string,
    email: string,
    roles: any;
}

const mappingDto = (user: UserModel): UserResponseDto => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roles: user.roles
});

export { mappingDto };