export interface LoginUser {
    email: string;
    password: string;
}

export interface BaseUser {
    firstname: string;
    lastname: string;
    email: string;
}

export interface NewUser extends BaseUser {
    password: string;
} 

export interface User extends NewUser {
    id: string;
}