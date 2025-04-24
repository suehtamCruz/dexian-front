import { UserModel } from "./user.model";

export interface LoginModel {
    password: string;
    nome: string;
}

export interface LoginResponse {
    token: string;
    user: UserModel;
}
